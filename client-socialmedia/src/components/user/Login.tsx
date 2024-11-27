import { useState } from 'react'
import useForm from '../hooks/useForm'
import Global from '../helpers/Global';
import useAuth from '../hooks/useAuth';
import { Button, Card, CardHeader, CardBody, Input } from "@nextui-org/react";
import { Link } from 'react-router-dom';

const Login = () => {

    const { form, changed } = useForm({});
    const [saved, setSaved] = useState("not_sended");
    const { setAuth }: any = useAuth();

    const loginUser = async (e: any) => {
        e.preventDefault();

        let userLogin = form;

        const request = await fetch(Global.url + 'user/login', {
            method: "POST",
            body: JSON.stringify(userLogin),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await request.json();

        if (data.status === "success") {

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setSaved("login");
            setAuth(data.user);

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            setSaved("error");
        }
    }

    const forgotPassword = (e: any) => {
        e.preventDefault();
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <Card className="py-6 center">
                <CardHeader className="pb-0 pt-2 px-2 flex-col items-center">
                    <p className='center'>
                    <img src="./src/assets/img/log.png" width="20%" alt="" style={{ borderRadius: '50%', margin: '0' }} />
                    </p>
                    <h1 className="content__title">Inicia en <span className="colored-text"></span>Social</h1>

                </CardHeader>
                <CardBody className="overflow-visible py-2 flex-col  ">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {saved === "login" &&
                    <strong className='alert alert-success' style={{ color: 'green', textAlign: 'center' }}>¡Usuario loggeado con éxito!</strong>
                }
                {saved === "error" &&
                    <strong className='alert alert-danger' style={{ color: 'red', textAlign: 'center' }}>¡Usuario NO se ha loggeado!</strong>
                }
                </div>

                    <form className='form-login' onSubmit={loginUser}>
                        <div className='form-login'>
                            <Input type='email' name='email' label="Correo" placeholder='Ingrese su correo' onChange={changed} />
                        </div>
                        <div className='form-login'>
                            <Input type='password' name='password' label="Contraseña" placeholder='Ingrese su contraseña' onChange={changed} />
                        </div>
                        <div className='form-login center'>
                            <Button radius="md" type='submit' color='primary'>
                                Iniciar sesión
                            </Button>
                        </div>
                        <div className='form-login center'>
                            <Button radius="md" color='primary' variant='ghost' onClick={(e) => forgotPassword(e)} >
                                ¿Olvidaste tu contraseña?
                            </Button>
                        </div>
                        <div className='form-login center'>
                        <p>
                            ¿No tienes una cuenta? <Link to="/register" style={{ color: 'blue' }}> Regístrate </Link>
                        </p>

                        </div>

                    </form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Login