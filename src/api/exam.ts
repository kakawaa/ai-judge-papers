import request from '@/utils/request';
import getFileFormData from '@/utils/file';
import { FileItem } from '@arco-design/web-vue';
import { ListResponse, Paging } from './types';

const schema = '/study/exam';
const enum ExamApi {
  create = `${schema}/create`,
  update = `${schema}/update`,
  delete = `${schema}/delete`,
  list = `${schema}/list`,
  addProblem = `${schema}/addProblem`,
  uploadTemplate = `${schema}/upload`, // 上传考试excel模板
}

/**
 * ExamUpdateReq
 */
export interface ExamFormData {
  description: string;
  id?: number;
  name: string;
  state: number | undefined;
  subject: number | undefined;
  time: number | undefined;
  timeLimit: number;
  type: number | undefined;
  [property: string]: any;
}

export interface ExamFileParams {
  file: FileItem;
  sheet?: string;
  examId: number;
}

export interface addProblemParams {
  examId: number;
  problemId: number;
  score: number;
  order: number;
  type: false;
}

export interface ExamListItem {
  id: number;
  name: string;
  description: string;
  state: number;
  type: number;
  subject: string;
  subjectId: number;
  time: number;
  timeLimit: number;
}

export function createExamApi(data: Omit<ExamFormData, 'id'>) {
  return request.post(ExamApi.create, data);
}

export function updateExamApi(data: ExamFormData) {
  return request.post(ExamApi.update, data);
}

export function deleteExamApi(id: number) {
  return request.post(ExamApi.delete, { id });
}

export function getExamListApi(data: Paging & { key: string }) {
  return request.post<ListResponse<ExamListItem>>(ExamApi.list, data);
}

export function uploadExamTemplateApi({ file, sheet = '', examId }: ExamFileParams) {
  return request.upload(ExamApi.uploadTemplate, file, { sheet, examId }, {});
}

export function addProblemApi(data: addProblemParams) {
  return request.post(ExamApi.addProblem, data);
}