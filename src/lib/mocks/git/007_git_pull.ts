import { QuestionTypes } from '../utils';

import type { ExerciseTemplate } from '$lib/utils/types';

const template: ExerciseTemplate = {
  title: 'Git Pull from Remote Quiz',
  description: 'Test your knowledge of Git pull operations from a remote repository',
  questionnaire: {
    questions: [
      {
        title: 'What is Git pull used for?',
        name: 'question1',
        points: 2,
        order: 1,
        question_type: QuestionTypes[0], // RADIO
        options: [
          { label: 'To push changes to a remote repository', is_correct: false },
          { label: 'To fetch changes from a remote repository and merge them into the current branch', is_correct: true },
          { label: 'To delete a remote repository', is_correct: false },
        ],
      },
      {
        title: 'How do you perform a Git pull from a remote repository?',
        name: 'question2',
        points: 2,
        order: 2,
        question_type: QuestionTypes[1], // CHECKBOX
        options: [
          { label: 'git pull origin branch-name', is_correct: true },
          { label: 'git push origin branch-name', is_correct: false },
          { label: 'git fetch origin branch-name', is_correct: false },
          { label: 'git merge origin branch-name', is_correct: false },
        ],
      },
      {
        title: 'Explain the purpose of Git pull in your own words.',
        name: 'question3',
        points: 2,
        order: 3,
        question_type: QuestionTypes[2], // TEXTAREA
        options: [],
      },
      {
        title: 'What is a remote repository in Git?',
        name: 'question4',
        points: 2,
        order: 4,
        question_type: QuestionTypes[0], // RADIO
        options: [
          { label: 'A local copy of a repository', is_correct: false },
          { label: 'A repository hosted on a remote server', is_correct: true },
          { label: 'A repository with no internet connection', is_correct: false },
        ],
      },
      {
        title: 'How do you specify the remote repository and branch when pulling changes in Git?',
        name: 'question5',
        points: 2,
        order: 5,
        question_type: QuestionTypes[1], // CHECKBOX
        options: [
          { label: 'By using "git pull origin branch-name"', is_correct: true },
          { label: 'By using "git pull branch-name"', is_correct: false },
          { label: 'By using "git pull remote-name branch-name"', is_correct: false },
          { label: 'By using "git pull"', is_correct: false },
        ],
      },
      {
        title: 'What does "git fetch" do?',
        name: 'question6',
        points: 2,
        order: 6,
        question_type: QuestionTypes[2], // TEXTAREA
        options: [],
      },
      {
        title: 'What is a Git conflict?',
        name: 'question7',
        points: 2,
        order: 7,
        question_type: QuestionTypes[0], // RADIO
        options: [
          { label: 'A disagreement between team members', is_correct: false },
          { label: 'A merge conflict when merging branches', is_correct: true },
          { label: 'A Git error message', is_correct: false },
        ],
      },
      {
        title: 'What is the purpose of "git log" in relation to Git pull?',
        name: 'question8',
        points: 2,
        order: 8,
        question_type: QuestionTypes[1], // CHECKBOX
        options: [
          { label: 'To view the commit history of the remote repository', is_correct: false },
          { label: 'To view the commit history of the local repository', is_correct: true },
          { label: 'To delete the commit history', is_correct: false },
          { label: 'To create a new branch', is_correct: false },
        ],
      },
      {
        title: 'Explain the Git conflict resolution process.',
        name: 'question9',
        points: 2,
        order: 9,
        question_type: QuestionTypes[2], // TEXTAREA
        options: [],
      },
      {
        title: 'What is a Git pull request?',
        name: 'question10',
        points: 2,
        order: 10,
        question_type: QuestionTypes[0], // RADIO
        options: [
          { label: 'A request to delete a branch', is_correct: false },
          { label: 'A request to merge changes into a branch', is_correct: true },
          { label: 'A request for technical support', is_correct: false },
        ],
      },
    ],
  },
};

export default template;
