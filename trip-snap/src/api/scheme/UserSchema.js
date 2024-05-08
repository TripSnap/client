import { boolean, object, string } from 'yup'
import { fetchData } from '@/utils/fetch'
import { debounceAsync } from '@/utils/utils'

const Regexp = Object.freeze({
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*[0-9]).{12,100}$/,
  NICKNAME: /^[a-zA-Z가-힣][0-9a-zA-Z가-힣]{4,19}$/,
})
export const joinSchema = object({
  email: string()
    .required('이메일은 필수 항목입니다.')
    .email('이메일 형식이 올바르지 않습니다.')
    .test({
      test: debounceAsync(2000, async (value, context) => {
        const response = await fetchData('/join/check-email', {
          method: 'POST',
          data: { email: value },
        })
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            const [obj] = context.from
            obj.value.checkEmail = true
            return data.success
          } else {
            return context.createError({ path: 'email', message: data.message })
          }
        }
        if (400 <= response.status && response.status <= 499) {
          return context.createError({
            path: 'email',
            message: '이메일 형식이 올바르지 않습니다.',
          })
        }
        return false
      }),
    }),
  password: string()
    .required('비밀번호는 필수 항목입니다.')
    .matches(Regexp.PASSWORD, '길이 12 ~ 100의 영어와 숫자를 포함해야 합니다.'),
  confirmPassword: string().when(['password'], ([password], schema) => {
    return schema.test({
      test: (confirmPassword) => password === confirmPassword,
      message: '비밀번호와 일치하지 않습니다.',
    })
  }),
  nickname: string()
    .required('닉네임은 필수 항목입니다.')
    .matches(Regexp.NICKNAME, '5~20글자의 영어 또는 한글로 시작해야 합니다.'),
  checkEmail: boolean().required('이메일 중복 체크가 필요합니다.'),
})

export const verifyEmailSchema = object({
  email: string().email('이메일 형식이 올바르지 않습니다.').required(),
  code: string().min(10).max(50).required(),
})

export const updateMemberDataSchema = object({
  nickname: string().matches(
    Regexp.NICKNAME,
    '5~20글자의 영어 또는 한글로 시작해야 합니다.'
  ),
  photo: string().min(10).max(50).notRequired(),
})

export const updatePasswordSchema = object({
  password: string().required('비밀번호는 필수 항목입니다.'),
  newPassword: string()
    .matches(Regexp.PASSWORD, '길이 12 ~ 100의 영어와 숫자를 포함해야 합니다.')
    .required('비밀번호는 필수 항목입니다.')
    .when(['password'], ([password], schema) => {
      return schema.test({
        test: (confirmNewPassword) => password !== confirmNewPassword,
        message: '이전 비밀번호와 다른 비밀번호를 설정하세요.',
      })
    }),
  confirmNewPassword: string().when(
    ['newPassword'],
    ([newPassword], schema) => {
      return schema.test({
        test: (confirmNewPassword) => newPassword === confirmNewPassword,
        message: '비밀번호와 일치하지 않습니다.',
      })
    }
  ),
})

export const loginSchema = object({
  password: string().required('비밀번호가 입력되지 않았습니다.'),
  email: string()
    .required('이메일이 입력되지 않았습니다.')
    .email('이메일 형식이 올바르지 않습니다.'),
})

export const searchFriendSchema = object({
  email: string()
    .required('이메일이 입력되지 않았습니다.')
    .email('이메일 형식이 올바르지 않습니다.'),
})

const memberSchema = object({})
