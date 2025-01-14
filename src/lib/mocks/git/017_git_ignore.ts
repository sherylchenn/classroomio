import { QuestionTypes } from '../utils';

import type { ExerciseTemplate } from '$lib/utils/types';

const template: ExerciseTemplate = {
  title: 'Git Ignore Quiz',
  description: 'Test your knowledge of .gitignore with practical questions.',
  questionnaire: {
    questions: [
      {
        title: 'What is the purpose of the .gitignore file in a Git repository?',
        name: 'q1',
        points: 2,
        order: 0,
        question_type: QuestionTypes[0], // RADIO
        options: [
          {
            label: 'To specify which files and directories should be excluded from version control',
            is_correct: true,
          },
          {
            label: 'To store sensitive information like passwords',
            is_correct: false,
          },
          {
            label: 'To track changes in the .gitignore file itself',
            is_correct: false,
          },
        ],
      },
      {
        title: 'How can you create a .gitignore file in your Git repository?',
        name: 'q2',
        points: 1,
        order: 1,
        question_type: QuestionTypes[0], // RADIO
        options: [
          {
            label: 'By manually creating a file named .gitignore',
            is_correct: true,
          },
          {
            label: 'By using the "git ignore" command',
            is_correct: false,
          },
          {
            label: 'The .gitignore file is automatically generated by Git',
            is_correct: false,
          },
        ],
      },
      {
        title: 'What is the purpose of the "*" wildcard in a .gitignore pattern?',
        name: 'q3',
        points: 2,
        order: 2,
        question_type: QuestionTypes[0], // RADIO
        options: [
          {
            label: 'To match zero or more characters',
            is_correct: true,
          },
          {
            label: 'To match exactly one character',
            is_correct: false,
          },
          {
            label: 'To match a specific file name',
            is_correct: false,
          },
        ],
      },
      {
        title: 'Explain the concept of a "global" .gitignore file.',
        name: 'q4',
        points: 3,
        order: 3,
        question_type: QuestionTypes[2], // TEXTAREA
        options: [],
      },
      {
        title: 'What happens if you add a file to the .gitignore list after it has been committed to the repository?',
        name: 'q5',
        points: 1,
        order: 4,
        question_type: QuestionTypes[0], // RADIO
        options: [
          {
            label: 'The file will continue to be tracked by Git',
            is_correct: false,
          },
          {
            label: 'The file will be untracked in future commits',
            is_correct: true,
          },
          {
            label: 'The file will be deleted from the repository',
            is_correct: false,
          },
        ],
      },
      {
        title: 'How can you check which files are being ignored by Git in a repository?',
        name: 'q6',
        points: 1,
        order: 5,
        question_type: QuestionTypes[0], // RADIO
        options: [
          {
            label: 'By using the "git ignored" command',
            is_correct: false,
          },
          {
            label: 'By inspecting the .gitignore file',
            is_correct: false,
          },
          {
            label: 'By using the "git status" command',
            is_correct: true,
          },
        ],
      },
      {
        title: 'What is the purpose of the ".gitignore" file located in your home directory?',
        name: 'q7',
        points: 2,
        order: 6,
        question_type: QuestionTypes[0], // RADIO
        options: [
          {
            label: 'To specify global Git ignore patterns for all repositories',
            is_correct: true,
          },
          {
            label: 'To store personal Git configuration settings',
            is_correct: false,
          },
          {
            label: 'To list your favorite Git repositories',
            is_correct: false,
          },
        ],
      },
      {
        title: 'How can you force Git to track files that are listed in the .gitignore file?',
        name: 'q8',
        points: 1,
        order: 7,
        question_type: QuestionTypes[0], // RADIO
        options: [
          {
            label: 'By using the "git add --force" command',
            is_correct: false,
          },
          {
            label: 'By removing the file from the .gitignore list and committing the change',
            is_correct: true,
          },
          {
            label: 'It is not possible to track ignored files',
            is_correct: false,
          },
        ],
      },
      {
        title: 'Explain the concept of a ".gitignore" template.',
        name: 'q9',
        points: 3,
        order: 8,
        question_type: QuestionTypes[2], // TEXTAREA
        options: [],
      },
      {
        title: 'What is the purpose of the ".git/info/exclude" file in a Git repository?',
        name: 'q10',
        points: 2,
        order: 9,
        question_type: QuestionTypes[0], // RADIO
        options: [
          {
            label: 'To specify repository-specific ignore patterns',
            is_correct: true,
          },
          {
            label: 'To store repository metadata',
            is_correct: false,
          },
          {
            label: 'To list contributors to the repository',
            is_correct: false,
          },
        ],
      },
    ],
  },
};

export default template;
