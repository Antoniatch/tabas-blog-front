import { gql, useMutation } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterFormProps } from '../components/inputs/inputsInterfaces'
import { registerSchema } from '../utils/schemaValidation'
import { UserContext } from '../contexts/UserContext'
import { NotificationContext } from '../contexts/NotificationContext'

const ADD_USER = gql`
  mutation Mutation($nickname: String!, $password: String!, $email: String!) {
    createUser(nickname: $nickname, password: $password, email: $email) {
      nickname
    }
  }
`

const GET_TOKEN = gql`
  mutation Mutation($password: String!, $email: String!) {
    login: getToken(password: $password, email: $email) {
      token
      user {
        id
        nickname
        email
        lastName
        firstName
        lastLogin
        description
        createdAt
        avatar
      }
    }
  }
`

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    resolver: yupResolver(registerSchema),
  })

  const [addUser] = useMutation(ADD_USER)
  const { setUser, isCreatingBlog } = useContext(UserContext)
  const navigate = useNavigate()
  const [loadToken] = useMutation(GET_TOKEN)
  const { message, setMessage } = useContext(NotificationContext)

  const { isCreatingBlog } = useContext(UserContext)

  const navigate = useNavigate()

  const onSubmit = async (data: FieldValues) => {
    const user = {
      nickname: data.nickname,
      email: data.email,
      password: data.password,
    }
    addUser({ variables: { ...user } })
      .then(() => {
        setMessage({
          text: 'Félicitation pour votre création de compte ! Bon voyage sur tabas.blog',
          type: 'success',
        })
        loadToken({
          variables: {
            email: data.email,
            password: data.password,
          },
        })
          .then((res) => {
            localStorage.setItem('token', res.data.login.token)
            const localUser = {
              id: res.data.login.user.id,
              nickname: res.data.login.user.nickname,
              avatar: res.data.login.user.avatar,
            }
            localStorage.setItem('user', JSON.stringify(localUser))
            setUser(res.data.login.user)
            isCreatingBlog ? navigate('/createblog') : navigate('/profile')
          })
          .catch((err) => console.error(err))
        isCreatingBlog ? navigate('/login') : navigate('/')
      })
      .catch((err) => {
        console.error(err)
        alert('Erreur')
      })
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            Créez votre compte maintenant !
          </h1>
          <p className="py-6">
            Vous souhaitez créer votre propre blog ? Inscrivez-vous dès
            maintenant sur notre plateforme ! L'inscription est simple et
            rapide, et vous donne accès à toutes les fonctionnalités de notre
            service de blogging. Vous pourrez personnaliser votre blog selon vos
            goûts et vos besoins, et partager vos passions et vos idées avec le
            monde entier. N'attendez plus, inscrivez-vous dès maintenant et
            lancez-vous dans l'aventure du blogging !
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-article bg-base-100 card-body">
          <form>
            <label className="form-control">
              <span className="label label-text">Email</span>
              <input
                {...register('email')}
                className={
                  errors.email ? 'input input-error' : 'input input-bordered'
                }
                id="email"
                type="email"
                placeholder="Email"
              />
              <p className="text text-error">{errors.email?.message}</p>
            </label>

            <label className="form-control">
              <span className="label label-text">Mot de passe</span>
              <input
                {...register('password')}
                className={
                  errors.password ? 'input input-error' : 'input input-bordered'
                }
                id="password"
                type="password"
                placeholder="Mot de passe"
              />
              <p className="text text-error">{errors.password?.message}</p>
            </label>

            <label className="form-control">
              <span className="label label-text">
                Confirmation du mot de passe
              </span>
              <input
                {...register('confirmPassword')}
                className={
                  errors.confirmPassword
                    ? 'input input-error'
                    : 'input input-bordered'
                }
                id="confirm-password"
                type="password"
                placeholder="Confirmation du mot de passe"
              />
              <p className="text text-error">
                {errors.confirmPassword?.message}
              </p>
            </label>

            <label className="form-control">
              <span className="label label-text">Pseudo</span>
              <input
                {...register('nickname')}
                className={
                  errors.nickname ? 'input input-error' : 'input input-bordered'
                }
                id="nickname"
                type="text"
                placeholder="Pseudo"
              />
              <p className="text text-error">{errors.nickname?.message}</p>
            </label>
          </form>
          <Link to="/login" className="label-text-alt link link-hover mt-6">
            Déjà membre ?
          </Link>
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="btn btn-primary"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
