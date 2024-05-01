import { array, date, number, object, string } from 'yup'

export const GroupInsSchema = object({
  title: string()
    .required('제목은 필수 입력사항입니다.')
    .min(10, '10~100글자만 가능합니다.')
    .max(100, '10~100글자만 가능합니다.'),
  memberEmails: array(string().email('잘못된 형식입니다.')).max(20).ensure(),
})

export const PhotoSchema = object({
  albumPhotoList: array(object({ photo: string().required() })).ensure(),
})

export const AlbumInsSchema = object({
  groupId: number().required(),
  title: string().required('기록 이름이 입력되지 않았습니다.'),
  date: date().required(),
  latitude: number().min(-90).max(90),
  longitude: number().min(-180).max(180),
  address: string().max(100).required('주소가 입력되지 않았습니다.'),
}).concat(PhotoSchema)
