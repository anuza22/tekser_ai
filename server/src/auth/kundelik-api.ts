import axios, { AxiosInstance, AxiosResponse } from 'axios';

class KunError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'KunError';
  }
}

class KunBase {
  session!: AxiosInstance;
  host: string;
  token: string | null;

  constructor(login?: string, password?: string, token?: string) {
    this.host = "https://api.kundelik.kz/v2/";
    this.token = token || null;
    if (!this.token && login && password) {

      this.initialize(login, password);
      console.log("not initialized here35")
    } else {
      this.session = this.createAxiosInstance(this.token);
    }
    // this.session = this.createAxiosInstance(this.token);

  }

  async initialize(login: string, password: string) {
    this.token = await this.getToken(login, password);
    this.session = this.createAxiosInstance(this.token);
  }

  private async getToken(login: string, password: string): Promise<string> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        'https://api.kundelik.kz/v2/authorizations/bycredentials',
        {
          client_id: '387d44e3-e0c9-4265-a9e4-a4caaad5111c',
          client_secret: '8a7d709c-fdbb-4047-b0ea-8947afe89d67',
          username: login,
          password: password,
          scope: 'Schools,Relatives,EduGroups,Lessons,marks,EduWorks,Avatar,EducationalInfo,CommonInfo,ContactInfo,FriendsAndRelatives,Files,Wall,Messages',
        }
      );
      const data = response.data;

      if (data.type === 'authorizationFailed') {
        throw new KunError(data.description);
      }

      if (response.status !== 200) {
        throw new KunError('Сайт лежит или ведутся технические работы, использование API временно невозможно');
      }

      return data.accessToken;
    } catch (error) {
      throw new KunError(`Error getting token: ${error}`);
    }
  }

  createAxiosInstance(token: string | null): AxiosInstance {
    return axios.create({
      headers: {
        'Access-Token': token || '',
      }
    });
  } 

  private static checkResponse(response: AxiosResponse<any>) {
    if (response.headers['content-type'] === 'text/html') {
      const errorHtml = response.data;
      const errorText = errorHtml.split('<div class="error__description">')[1]
        .split('<p>')[1]
        .split('</p>')[0]
        .trim();
      throw new KunError(errorText);
    }

    const jsonResponse = response.data;
    if (typeof jsonResponse === 'object') {
      if (jsonResponse.type === 'parameterInvalid') {
        throw new KunError(jsonResponse.description);
      }
      if (jsonResponse.type === 'apiServerError' || jsonResponse.type === 'apiUnknownError') {
        throw new KunError('Неизвестная ошибка в API, проверьте правильность параметров');
      }
    }
  }

  protected async get(method: string, params: any = {}): Promise<any> {
    if (!this.session) {
      throw new Error('Session is not initialized');
    }
    const response = await this.session.get(this.host + method, { params });
    KunBase.checkResponse(response);
    return response.data;
  }

  protected async post(method: string, data: any = {}): Promise<any> {
    const response = await this.session.post(this.host + method, data);
    KunBase.checkResponse(response);
    return response.data;
  }

  protected async delete(method: string, params: any = {}): Promise<any> {
    const response = await this.session.delete(this.host + method, { params });
    KunBase.checkResponse(response);
    return response.data;
  }

  protected async put(method: string, data: any = {}): Promise<any> {
    const response = await this.session.put(this.host + method, data);
    KunBase.checkResponse(response);
    return response.data;
  }
}

class KunAPI extends KunBase {
  constructor(login?: string, password?: string, token?: string) {
    super(login, password, token);
  }

  async getSchool() {
    return await this.get('schools/person-schools');
  }

  async getInfo() {
    return await this.get('users/me');
  }

  async getClassmates() {
    return await this.get('users/me/classmates');
  }

  async getContext() {
    return await this.get('users/me/context');
  }

  async getOrganizations() {
    return await this.get('users/me/organizations');
  }

  async getOrganizationInfo(organizationId: number) {
    return await this.get(`users/me/organizations/${organizationId}`);
  }

  async getUserContext(userId: number) {
    return await this.get(`users/${userId}/context`);
  }

  async getUserMemberships(userId: number) {
    return await this.get(`users/${userId}/school-memberships`);
  }

  async getUserEducation(userId: number) {
    return await this.get(`users/${userId}/education`);
  }

  async getPersonMemberships(personId: number) {
    return await this.get(`persons/${personId}/school-memberships`);
  }

  async getSchools() {
    return await this.get(`users/me/schools`);
  }

  async getUserSchools(userId: number) {
    return await this.get(`users/${userId}/schools`);
  }

  async getEduGroups() {
    return await this.get(`users/me/edu-groups`);
  }

  async getUserEduGroups(userId: number) {
    return await this.get(`users/${userId}/edu-groups`);
  }

  async getMemberships() {
    return await this.get(`users/me/school-memberships`);
  }

  async getGroupInfo(eduGroupId: number) {
    return await this.get(`edu-groups/${eduGroupId}`);
  }

  async getGroupsInfo(eduGroupsList: number[]) {
    return await this.get(`edu-groups`, { eduGroups: eduGroupsList });
  }

  async getSchoolGroups(schoolId: number) {
    return await this.get(`schools/${schoolId}/edu-groups`);
  }

  async getPersonGroups(personId: number) {
    return await this.get(`persons/${personId}/edu-groups`);
  }

  async getPersonGroupsAll(personId: number) {
    return await this.get(`persons/${personId}/edu-groups/all`);
  }

  async getPersonSchoolGroups(personId: number, schoolId: number) {
    return await this.get(`persons/${personId}/schools/${schoolId}/edu-groups`);
  }

  async getGroupsPupils(eduGroupId: number) {
    return await this.get(`edu-groups/${eduGroupId}/persons`);
  }

  async getGroupsParallel(groupId: number) {
    return await this.get(`edu-groups/${groupId}/parallel`);
  }

  async getGroupMarks(groupId: number) {
    return await this.get(`edu-groups/${groupId}/final-marks`);
  }

  async getPersonGroupMarks(personId: number, groupId: number) {
    return await this.get(`persons/${personId}/edu-groups/${groupId}/final-marks`);
  }

  async getPersonGroupMarksFinal(personId: number, groupId: number) {
    return await this.get(`persons/${personId}/edu-groups/${groupId}/allfinalmarks`);
  }

  async getGroupSubjectFinalMarks(groupId: number, subjectId: number) {
    return await this.get(`edu-groups/${groupId}/subjects/${subjectId}/final-marks`);
  }

  async getFriends() {
    return await this.get(`users/me/friends`);
  }

  async getUserFriends(userId: number) {
    return await this.get(`users/${userId}/friends`);
  }

  async getSchoolHomework(schoolId: number, startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`users/me/school/${schoolId}/homeworks`, { startDate: startTime, endDate: endTime });
  }

  async getHomeworkById(homeworkId: number) {
    return await this.get(`users/me/school/homeworks`, { homeworkId });
  }

  async getPersonHomework(schoolId: number, personId: number, startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`persons/${personId}/school/${schoolId}/homeworks`, { startDate: startTime, endDate: endTime });
  }

  async deleteLessonLog(lessonId: number, personId: number) {
    return await this.delete(`lessons/${lessonId}/log-entries`, { person: personId });
  }

  async getLessonLog(lessonId: number) {
    return await this.get(`lessons/${lessonId}/log-entries`);
  }

  async postLessonLog(lessonId: number, lessonLogEntry: any) {
    return await this.post(`lessons/${lessonId}/log-entries`, { lessonLogEntry });
  }

  async putLessonLog(lessonId: number, personId: number, lessonLogEntry: any) {
    return await this.put(`lessons/${lessonId}/log-entries`, { person: personId, lessonLogEntry });
  }

  async getLessonLogs(lessonsIds: number[]) {
    return await this.get(`lesson-log-entries`, { lessons: lessonsIds });
  }

  async getPersonLessonLog(personId: number, lessonId: number) {
    return await this.get(`lesson-log-entries/lesson/${lessonId}/person/${personId}`);
  }

  async getGroupLessonLog(groupId: number, subjectId: number, startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`lesson-log-entries/group/${groupId}`, { subject: subjectId, from: startTime, to: endTime });
  }

  async getPersonSubjectLessonLog(personId: number, subjectId: number, startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`lesson-log-entries/person/${personId}/subject/${subjectId}`, { subject: subjectId, from: startTime, to: endTime });
  }

  async getPersonLessonLogs(personId: number, startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`persons/${personId}/lesson-log-entries`, { startDate: startTime, endDate: endTime });
  }

  async getLessonLogStatuses() {
    return await this.get(`lesson-log-entries/statuses`);
  }

  async getLessonInfo(lessonId: number) {
    return await this.get(`lessons/${lessonId}`);
  }

  async getManyLessonsInfo(lessonsList: number[]) {
    return await this.post(`lessons/many`, { lessons: lessonsList });
  }

  async getGroupLessonsInfo(groupId: number, startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`edu-groups/${groupId}/lessons/${startTime}/${endTime}`);
  }

  async getMarksHistogram(workId: number) {
    return await this.get(`works/${workId}/marks/histogram`);
  }

  async getSubjectMarksHistogram(groupId: number, periodId: number, subjectId: number) {
    return await this.get(`periods/${periodId}/subjects/${subjectId}/groups/${groupId}/marks/histogram`);
  }

  async getMarkById(markId: number) {
    return await this.get(`marks/${markId}`);
  }

  async getMarksByWork(workId: number) {
    return await this.get(`works/${workId}/marks`);
  }

  async getMarksByLesson(lessonId: number) {
    return await this.get(`lessons/${lessonId}/marks`);
  }

  async getMarksByLessons(lessonsIds: number[]) {
    return await this.post(`lessons/marks`, { lessons: lessonsIds });
  }

  async getGroupMarksPeriod(groupId: number, startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`edu-groups/${groupId}/marks/${startTime}/${endTime}`);
  }

  async getGroupSubjectMarks(groupId: number, subjectId: number, startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`edu-groups/${groupId}/subjects/${subjectId}/marks/${startTime}/${endTime}`);
  }

  async getPersonMarks(personId: number, schoolId: number, startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`persons/${personId}/schools/${schoolId}/marks/${startTime}/${endTime}`);
  }

  async getPersonLessonsMarks(personId: number, lessonId: number) {
    return await this.get(`persons/${personId}/lessons/${lessonId}/marks`);
  }

  async getPersonWorkMarks(personId: number, workId: number) {
    return await this.get(`persons/${personId}/works/${workId}/marks`);
  }

  async getPersonSubjectMarks(personId: number, subjectId: number, startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`persons/${personId}/subjects/${subjectId}/marks/${startTime}/${endTime}`);
  }

  async getMarksByDate(personId: number, date: Date = new Date()) {
    return await this.get(`persons/${personId}/marks/${date}`);
  }

  async getMarksValues() {
    return await this.get(`https://api.kundelik.kz/v2.0/marks/values`);
  }

  async getMarksValuesByType(marksType: string) {
    return await this.get(`marks/values/type/${marksType}`);
  }

  async getPersonAverageMarks(personId: number, periodId: number) {
    return await this.get(`persons/${personId}/reporting-periods/${periodId}/avg-mark`);
  }

  async getPersonAverageMarksBySubject(personId: number, periodId: number, subjectId: number) {
    return await this.get(`persons/${personId}/reporting-periods/${periodId}/subjects/${subjectId}/avg-mark`);
  }

  async getGroupAverageMarksByDate(groupId: number, periodId: number, date: Date = new Date()) {
    return await this.get(`edu-groups/${groupId}/reporting-periods/${periodId}/avg-marks/${date}`);
  }

  async getGroupAverageMarksByTime(groupId: number, startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`edu-groups/${groupId}/avg-marks/${startTime}/${endTime}`);
  }

  async getFinalGroupMarks(groupId: number) {
    return await this.get(`edu-group/${groupId}/criteria-marks-totals`);
  }

  async getFinalGroupMarksBySubject(groupId: number, subjectId: number) {
    return await this.get(`edu-group/${groupId}/subject/${subjectId}/criteria-marks-totals`);
  }

  async getGroupPersons(groupId: number) {
    return await this.get(`persons`, { eduGroup: groupId });
  }

  async getPersonInfo(personId: number) {
    return await this.get(`persons/${personId}`);
  }

  async getRecentPersonMarks(personId: number, groupId: number) {
    return await this.get(`persons/${personId}/group/${groupId}/recentmarks`);
  }

  async getGroupReports(groupId: number) {
    return await this.get(`edu-groups/${groupId}/reporting-periods`);
  }

  async getPersonSchedule(personId: number, groupId: number, startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`persons/${personId}/groups/${groupId}/schedules`, { startDate: startTime, endDate: endTime });
  }

  async getBestSchools(startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`school-rating/from/${startTime}/to/${endTime}`);
  }

  async getSchoolProfile(schoolId: number) {
    return await this.get(`schools/${schoolId}`);
  }

  async getSchoolsProfiles(schoolsIds: number[]) {
    return await this.get(`schools`, { schools: schoolsIds });
  }

  async getMySchools() {
    return await this.get(`schools/person-schools`);
  }

  async getAllSchools() {
    return await this.get(`schools/cities`);
  }

  async getSchoolParams(schoolId: number) {
    return await this.get(`schools/${schoolId}/parameters`);
  }

  async getGroupSubjects(groupId: number) {
    return await this.get(`edu-groups/${groupId}/subjects`);
  }

  async getSchoolSubjects(schoolId: number) {
    return await this.get(`schools/${schoolId}/subjects`);
  }

  async getTaskInfo(taskId: number) {
    return await this.get(`tasks/${taskId}`);
  }

  async getLessonsTask(lessonsIds: number[]) {
    return await this.get(`tasks`, { lessons: lessonsIds });
  }

  async getLessonTask(lessonId: number) {
    return await this.get(`lessons/${lessonId}/tasks`);
  }

  async getPersonTasks(personId: number, subjectId: number, startTime: Date = new Date(), endTime: Date = new Date()) {
    return await this.get(`persons/${personId}/tasks`, { subject: subjectId, from: startTime, to: endTime });
  }

  async getTeacherStudents(teacherId: number) {
    return await this.get(`teacher/${teacherId}/students`);
  }

  async getSchoolTeachers(schoolId: number) {
    return await this.get(`schools/${schoolId}/teachers`);
  }

  async getSchoolTimetable(schoolId: number) {
    return await this.get(`schools/${schoolId}/timetables`);
  }

  async getGroupTimetable(groupId: number) {
    return await this.get(`edu-groups/${groupId}/timetables`);
  }

  async getFeed() {
    return await this.get("users/me/feed", { date: new Date() });
  }

  async getStudentsGroupsList() {
    return await this.get("edu-groups/students");
  }

  async getUserGroups(userId: number) {
    return await this.get(`users/${userId}/groups`);
  }

  async getPersonChildren(personId: number) {
    return await this.get(`user/${personId}/children`);
  }

  async getUserChildren(userId: number) {
    return await this.get(`user/${userId}/children`);
  }

  async getChildren() {
    return await this.get("users/me/children");
  }

  async getUserRelatives(userId: number) {
    return await this.get(`users/${userId}/relatives`);
  }

  async getRelatives() {
    return await this.get("users/me/relatives");
  }

  async getChildrenRelatives() {
    return await this.get("users/me/childrenrelatives");
  }

  async getUserInfo(userId: number) {
    return await this.get(`users/${userId}`);
  }

  async getRoles() {
    return await this.get("users/me/roles");
  }

  async getUserRoles(userId: number) {
    return await this.get(`users/${userId}/roles`);
  }

  async getGroupAverageMarks(groupId: number, startTime = new Date(), endTime = new Date()) {
    return await this.get(`edu-groups/${groupId}/wa-marks/${startTime.toISOString()}/${endTime.toISOString()}`);
  }

  async getLessonWorks(lessonId: number) {
    return await this.get("works", { lesson: lessonId });
  }

  async createLessonWork(work: any) {
    return await this.post("works", { work });
  }

  async getWorkTypes(schoolId: number) {
    return await this.get(`work-types/${schoolId}`);
  }

  async inviteToEvent(inviteId: number) {
    return await this.post(`events/${inviteId}/invite`);
  }
}

export { KunAPI, KunError };
