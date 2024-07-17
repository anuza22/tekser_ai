export interface CreateUserDto {
  kundelikLogin: string;
  kundelikPassword: string;
  name: string;
  surname: string;
  thirdname: string;
  userType: 'Teacher' | 'Student';
}
