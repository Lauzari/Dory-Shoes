# TC-001 - Registro exitoso de usuario

## Módulo
Registro

## Precondiciones
El usuario no debe estar registrado previamente.

## Pasos
1. Abrir la página de registro.
2. Completar nombre de usuario.
3. Completar email válido.
4. Completar contraseña válida.
5. Presionar botón "Registrarse".

## Resultado Esperado
El sistema registra correctamente al usuario y redirecciona al inicio o login.

## Resultado Actual
El usuario se registró correctamente.

## Estado
PASS

---

# TC-002 - Validación de campos vacíos en registro

## Módulo
Registro

## Precondiciones
Ninguna.

## Pasos
1. Abrir la página de registro.
2. Dejar los campos vacíos.
3. Presionar botón "Registrarse".

## Resultado Esperado
El sistema muestra mensajes indicando que los campos son obligatorios.

## Resultado Actual
Las validaciones se mostraron correctamente.

## Estado
PASS

---
# TC-003 - Inicio de sesión exitoso

## Módulo
Login

## Precondiciones
Usuario registrado previamente.

## Pasos
1. Abrir página de login.
2. Ingresar email válido.
3. Ingresar contraseña válida.
4. Presionar botón "Ingresar".

## Resultado Esperado
El usuario accede correctamente al sistema.

## Resultado Actual
El sistema muestra mensaje de credenciales inválidas aun utilizando un usuario registrado correctamente.

## Estado
FAIL

## Observaciones
Se detectó incidencia relacionada con la validación de autenticación de usuarios registrados.

---

# TC-004 - Validación de login con contraseña incorrecta

## Módulo
Login

## Precondiciones
Usuario registrado previamente.

## Pasos
1. Abrir página de login.
2. Ingresar email válido.
3. Ingresar contraseña incorrecta.
4. Presionar botón "Ingresar".

## Resultado Esperado
El sistema muestra mensaje de credenciales inválidas.

## Resultado Actual
El mensaje de error se mostró correctamente.

## Estado
PASS

---

# TC-005 - Visualización correcta del detalle de producto

## Módulo
Productos

## Precondiciones
Productos cargados en el sistema.

## Pasos
1. Abrir listado de productos.
2. Seleccionar un producto.

## Resultado Esperado
El detalle muestra imagen, nombre, descripción, precio y talles disponibles.

## Resultado Actual
La información se mostró correctamente.

## Estado
PASS

---

# TC-006 - Selección de talle disponible

## Módulo
Productos

## Precondiciones
Producto con múltiples talles disponibles.

## Pasos
1. Abrir detalle del producto.
2. Seleccionar un talle disponible.

## Resultado Esperado
El talle seleccionado queda marcado correctamente.

## Resultado Actual
El talle se seleccionó correctamente.

## Estado
PASS

---

# TC-007 - Agregar producto al carrito luego de seleccionar talle

## Módulo
Carrito

## Precondiciones
Producto disponible y talle seleccionado.

## Pasos
1. Abrir detalle del producto.
2. Seleccionar talle.
3. Presionar botón "Agregar al carrito".

## Resultado Esperado
El producto se agrega correctamente al carrito con el talle seleccionado.

## Resultado Actual
El producto se agregó correctamente.

## Estado
PASS

---

# TC-008 - Visualización correcta de productos en carrito

## Módulo
Carrito

## Precondiciones
Producto agregado previamente al carrito.

## Pasos
1. Abrir carrito de compras.

## Resultado Esperado
El carrito muestra nombre, talle, cantidad y precio del producto agregado.

## Resultado Actual
La información se mostró correctamente.

## Estado
PASS

---

# TC-009 - Actualización correcta de cantidad de productos

## Módulo
Carrito

## Precondiciones
Producto agregado previamente al carrito.

## Pasos
1. Abrir carrito.
2. Incrementar cantidad del producto.

## Resultado Esperado
La cantidad del producto se actualiza correctamente.

## Resultado Actual
La cantidad se actualizó correctamente.

## Estado
PASS

---

# TC-010 - Actualización correcta del monto total

## Módulo
Carrito

## Precondiciones
Producto agregado previamente al carrito.

## Pasos
1. Abrir carrito.
2. Modificar cantidad del producto.

## Resultado Esperado
El monto total se recalcula correctamente según cantidad y precio.

## Resultado Actual
El monto total no se actualiza luego de modificar la cantidad del producto.

## Estado
FAIL

---

# TC-011 - Eliminación de producto del carrito

## Módulo
Carrito

## Precondiciones
Producto agregado previamente al carrito.

## Pasos
1. Abrir carrito de compras.
2. Presionar botón eliminar producto.

## Resultado Esperado
El producto se elimina correctamente del carrito.

## Resultado Actual
El producto fue eliminado correctamente.

## Estado
PASS

---

# TC-012 - Navegación correcta entre categorías

## Módulo
Categorías

## Precondiciones
Categorías disponibles en la tienda.

## Pasos
1. Abrir dropdown "Categorias".

2. Seleccionar categoría "Zapatillas".
3. Seleccionar categoría "Botas".
4. Seleccionar categoría "Pantuflas".
5. Seleccionar categoria "Zapatos"
## Resultado Esperado
El sistema muestra correctamente los productos correspondientes a cada categoría seleccionada.

## Resultado Actual
Las categorías se visualizaron correctamente.

## Estado
PASS

---

# TC-013 - Búsqueda de producto por nombre

## Módulo
Búsqueda

## Precondiciones
Productos cargados en el sistema.

## Pasos
1. Abrir página principal.
2. Escribir nombre de producto en el buscador.
3. Presionar Enter o botón buscar.

## Resultado Esperado
El sistema muestra productos relacionados con el nombre ingresado.

## Resultado Actual
Los resultados se mostraron correctamente.

## Estado
PASS