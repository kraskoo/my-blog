import { AngularEditorConfig } from '@kolkov/angular-editor';

export const angularEditorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '15rem',
  minHeight: '25rem',
  placeholder: 'Enter text here...',
  translate: 'no',
  uploadUrl: 'http://localhost:65535/upload/images'
};
