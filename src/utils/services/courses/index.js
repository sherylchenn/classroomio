import { supabase } from '../../functions/supabase';
import { isUUID } from '../../functions/isUUID';
import { QUESTION_TYPE } from '../../../components/Question/constants';

export async function fetchCourse(courseId, session) {
  let jsonUser;

  try {
    jsonUser = JSON.parse(session.user);
  } catch (error) {
    console.log('Token is expired probably cause user not found');
    return this.redirect(301, '/login');
  }

  const { data, error } = await supabase
    .from('course')
    .select(
      `
      id,
      title,
      overview,
      group(*,
        members:groupmember(*,
          profile(*)
        )
      ),
      lessons:lesson(
        id, title,public, lesson_at, call_url, is_complete,created_at,
        profile:teacher_id(id, avatar_url, fullname)
      )
    `
    )
    .match({ id: courseId })
    .single();

  if (!data || error) {
    console.log(`data`, data);
    console.log(`fetchCourse => error`, error);
    return this.redirect(301, '/courses');
  }

  return {
    data,
    error,
  };
}

export async function updateCourse(courseId, course) {
  return await supabase
    .from('course')
    .update(course, { returning: 'minimal' })
    .match({ id: courseId });
}

export function fetchLesson(lessonId) {
  return supabase
    .from('lesson')
    .select(`id, note, video_url, slide_url, call_url`)
    .eq('id', lessonId)
    .single();
}

export function createLesson(lesson) {
  return supabase.from('lesson').insert(lesson);
}

export function updateLesson(lesson, lessonId) {
  return supabase
    .from('lesson')
    .update(lesson, { returning: 'minimal' })
    .match({ id: lessonId });
}

export function deleteLesson(lessonId) {
  // Need to implement soft delete
  return supabase.from('lesson').delete().match({ id: lessonId });
}

export function createExercise(exercise) {
  return supabase.from('exercise').insert(exercise);
}

function isNew(item) {
  return isNaN(item);
}

export async function upsertExercise(questionnaire, exerciseId) {
  const {
    questions,
    title,
    description,
    is_title_dirty,
    is_description_dirty,
  } = questionnaire;

  if (is_description_dirty || is_title_dirty) {
    await supabase
      .from('exercise')
      .update({
        title,
        description,
      })
      .match({ id: exerciseId });
  }

  const updatedQuestions = [];

  for (const question of questions) {
    const {
      title,
      id,
      name,
      question_type,
      options,
      deleted_at,
      points,
      is_dirty,
    } = question;

    // DELETE /delete/:questionId
    if (deleted_at) {
      // Delete from server only if this question exists in the database
      if (!isNew(id)) {
        Promise.all([
          supabase.from('option').delete().match({ question_id: id }),
          supabase.from('question').delete().match({ id }),
        ]);
      }

      // Skip the remaining operation so we filter out this question from the new questions array
      continue;
    }

    // INSERT or UPDATE /update/:questionId or /insert/:questionId
    const newQuestion = {
      id: isNew(id) ? undefined : id,
      name: isNew(id) ? undefined : name,
      title,
      points,
      question_type_id: question_type.id,
      exercise_id: exerciseId,
    };
    let questionSupabaseRes;

    if (is_dirty || isNew(id)) {
      const res = await supabase.from('question').upsert(newQuestion);

      if (res.error) {
        console.error(`Upsert question`, error);
      }
      questionSupabaseRes = Array.isArray(res.data) ? res.data[0] : null;
    } else {
      questionSupabaseRes = Object.assign(newQuestion);
    }

    if (questionSupabaseRes) {
      const { question_type_id, id, name } = questionSupabaseRes;

      // Delete cause this is not a field in the table
      delete newQuestion.question_type_id;

      newQuestion.question_type = { id: question_type_id };
      newQuestion.id = id;
      newQuestion.name = name;
      newQuestion.options = [];

      // Don't map options for 'Paragraph' questions
      if (QUESTION_TYPE.TEXTAREA !== question_type_id) {
        for (const option of options) {
          const { deleted_at, is_dirty } = option;

          // DELETE /delete/:optionId
          if (deleted_at) {
            // if this option exists in the database
            if (!isNew(option.id)) {
              supabase.from('option').delete().match({ id: option.id });
            }

            // Skip the remaining operation so we filter out this option from the new option array
            continue;
          }

          // INSERT and UPDATE
          const newOption = {
            ...option,
            is_dirty: undefined,
            id: isNew(option.id) ? undefined : option.id,
            value: isUUID(option.value) ? option.value : undefined, // this value is of UUID type
            question_id: newQuestion.id,
          };

          if (is_dirty || isNew(option.id)) {
            const { data } = await supabase.from('option').upsert(newOption);
            if (Array.isArray(data)) {
              newQuestion.options.push(data[0]);
            }
          } else {
            newQuestion.options.push(newOption);
          }
        }
      }

      updatedQuestions.push(newQuestion);
    }
  }

  return updatedQuestions;
}

export async function submitExercise(
  answers,
  questions,
  exerciseId,
  courseId,
  group,
  profile
) {
  let groupMember;

  if (Array.isArray(group.tutors)) {
    groupMember = group.tutors.find(
      (student) => student.profile_id === profile.id
    );
  }
  console.log(`groupMember`, groupMember);
  if (!groupMember) {
    return;
  }

  const questionsByName = questions.reduce(
    (acc, q) => ({ ...acc, [q.name]: q.id }),
    {}
  );
  const questionAnswers = [];

  const { data: submission } = await supabase.from('submission').insert({
    submitted_by: groupMember.id,
    exercise_id: exerciseId,
    course_id: courseId,
  });

  for (const questionName in answers) {
    const value = answers[questionName];

    const questionAnswer = {
      group_member_id: groupMember.id,
      question_id: questionsByName[questionName],
      open_answer: '',
      answers: [],
      submission_id: submission[0].id,
    };

    if (typeof value === 'string') {
      questionAnswer.open_answer = value;
    } else {
      questionAnswer.answers = value;
    }

    questionAnswers.push(questionAnswer);
  }

  const res = await supabase.from('question_answer').insert(questionAnswers);
  console.log(`res`, res);
}
