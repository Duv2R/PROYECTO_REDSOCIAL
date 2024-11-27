import { useState } from 'react'
import useForm from '../hooks/useForm'
import Global from '../helpers/Global';
import { Button, Card, CardHeader, CardBody, Input } from "@nextui-org/react";
import { Link } from 'react-router-dom';

const Register = () => {

    const { form, changed } = useForm({});

    const [saved, setSaved] = useState("not sended");

    const saveUser = async (e: any) => {
        e.preventDefault();

        let newUser = form;

        const request = await fetch(Global.url + 'user/register', {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await request.json();

        if (data.status === "success") {
            setSaved("saved");
        } else {
            setSaved("error");
        }

    }

    return (
        <Card className="py-6 center">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <p className='center'>
                        <img src="./src/assets/img/log.png" width="20%" alt="" style={{ borderRadius: '50%', margin: '0' }} />
                    </p>
                <h1 className="content__title">Registrate en <span className="colored-text"></span>Social</h1>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                {saved === "saved" ?
                    <strong className='alert alert-success'>¡Usuario registrado con exito!</strong>
                    : ''
                }
                {saved === "error" ?
                    <strong className='alert alert-danger'>¡Usuario NO se ha registrado!</strong>
                    : ''
                }
                <form className='form-register' onSubmit={saveUser}>
                    <div className='form-register'>
                        <Input type='text' name='name' label="Nombre" placeholder="Ingrese su nombre" onChange={changed} />
                    </div>
                    <div className='form-register'>
                        <Input type='text' name='surname' label="Apellidos" placeholder='Ingrese sus apellidos' onChange={changed} />
                    </div>
                    <div className='form-register'>
                        <Input type='text' name='nick' label="Nombre de usuario" placeholder='Ingrese su nombre de usuario' onChange={changed} />
                    </div>
                    <div className='form-register'>
                        <Input type='email' name='email' label="Correo" placeholder='Ingrese su correo' onChange={changed} />
                    </div>
                    <div className='form-register'>
                        <Input type='password' name='password' label="Contraseña" placeholder='Ingrese su contraseña' onChange={changed} />
                    </div>
                    <div className='form-register center'>
                        <Button radius="md" type='submit' color='primary'>
                            Regístrate
                        </Button>
                    </div>
                    <div className='form-register center'>
                    <p>
                        ¿Ya tienes una cuenta? <Link to="/login" style={{ color: 'blue' }}> Iniciar sesión </Link>
                    </p>

                    </div>
                </form>
            </CardBody>
        </Card>
    )
}

export default Register