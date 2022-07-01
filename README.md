# Duke's Gestor de notas
Realizado por los desarrolladores: 

Andrés Castañeda, Doris Mosquera, Juan Pablo Toro, Juan Fernando Vargas y Santiago Viana


## Descripción

Duke's gestor de notas (Dukes-GN) es un aplicativo web que permite la gestión  de notas académicas.

## Tabla de contenido

## Despliegue Firebase

Firebase url: https://dukes-9be6f.web.app/




## Tabla de Contenido 
[· Empezar](#Inicio)  
[· Página de inicio](#Inicio)  
[· Página de Usuario](#Usuario)  
[· Página de Administrador](#Administrador)  
[· Página de Super administrador](#Super)  

## Empezar 🏄
Prerequisitos: [Node (v16 LTS)](https://nodejs.org/en/download/) y [Git](https://git-scm.com/downloads)

> Clona el repositorio:

```
git clone https://github.com/JuanWebDeveloper/Dukes-GN-Frontend.git
```
> Instala las dependencias:
```
npm install 
```
> Corre el proyecto:
---
```
ng serve -o 
```

## Página de inicio  🔐

Lo primero que nos encontramos al ingresar a Dukes gestor de notas será el módulo de iniciar sesión, 
en él sólo los usuarios creados por el super administrador podrán ingresar, y según el rol asignado; user, admin o root, las cuales tendrán acciones específicas, el módulo también nos brinda la opción de recuperar la contraseña
a través del correo electrónico (anteriormente suministrada al super administrador): 

![Screen Shot 2022-07-01 at 7 34 29 AM](https://user-images.githubusercontent.com/90350943/176895947-f576694e-b7bf-49b9-8ec3-20c35b2f3fe8.png)

![Screen Shot 2022-07-01 at 7 42 28 AM](https://user-images.githubusercontent.com/90350943/176896752-8be13b51-08c3-4d25-9e0c-3d1cbf0f9377.png)

## Página de Usuario (user) 🙋

Cuando el usuario ingresa a Duke's gestor de notas será recibido con un mensaje de bienvenida. Luego podrá consultar su progreso académico mediante una gráfica de dispersión o representada en una tabla de notas,
y cambiar su información personal.

![Screen Shot 2022-07-01 at 8 02 52 AM](https://user-images.githubusercontent.com/90350943/176900333-f0e9438c-43f9-4058-a1d3-92fc7c22968a.png)

![Screen Shot 2022-07-01 at 8 01 42 AM](https://user-images.githubusercontent.com/90350943/176900588-8e4ed26d-b6a4-4d35-b0da-a2e72f10d2d1.png)

![Screen Shot 2022-07-01 at 8 10 09 AM](https://user-images.githubusercontent.com/90350943/176904025-5179e557-fcb6-48c4-a937-d5441dd104ac.png)
 
## Página de Administrador (admin) 📋

La cuenta con el rol de administrador será recibido también con un mensaje de bienvenida, pero contará con una pestaña diferente. El módulo de administrador; el cual consiste de tres páneles para
la creación y modificación de programas y módulos y asignación de estudiantes, un sistema de calificación y una vista para observar el proceso del programa.


## Página de Super Administrador (root) 👤

El usurio «root» o super administrador será la cuenta que tenga el permiso para crear usuarios user y usuarios admin [1]. Adicional a esto cuenta con dos páneles que vistan el listado de usuarios creados con su respectiva
información [2] y uno segundo que enlista los programas creados por los usuarios admin [3].

![Screen Shot 2022-07-01 at 9 20 20 AM](https://user-images.githubusercontent.com/90350943/176912788-9f90abcf-6948-4fa5-824e-8b4785f56c6d.png)

![Screen Shot 2022-07-01 at 9 26 24 AM](https://user-images.githubusercontent.com/90350943/176914099-11a1af3e-7fca-4739-86fb-070cb7a2e17e.png)

![Screen Shot 2022-07-01 at 9 26 43 AM](https://user-images.githubusercontent.com/90350943/176914103-99113dab-3a86-4e23-989e-1489f9964aaa.png)

![Screen Shot 2022-07-01 at 9 27 01 AM](https://user-images.githubusercontent.com/90350943/176914105-74e245b7-da88-4f15-890b-b126b8fe1849.png)





