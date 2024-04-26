import { array, object, string } from 'yup'

export const GroupInsSchema = object({
  title: string()
    .required('제목은 필수 입력사항입니다.')
    .min(10, '10~100글자만 가능합니다.')
    .max(100, '10~100글자만 가능합니다.'),
  memberEmails: array(string().email('잘못된 형식입니다.')).max(20).ensure(),
})
