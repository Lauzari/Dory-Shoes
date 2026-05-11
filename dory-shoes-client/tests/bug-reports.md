# BUG-001 - El total del carrito no se actualiza correctamente

## Prioridad
Alta

## Severidad
Media

## Entorno
Google Chrome - Windows 10

## Pasos para reproducir
1. Agregar producto al carrito
2. Incrementar cantidad
3. Verificar total

## Resultado Esperado
El total debería recalcularse correctamente.

## Resultado Actual
El total permanece igual.

## Estado
Closed



# BUG-002 - Usuarios registrados no pueden iniciar sesión

## Prioridad
Alta

## Severidad
Crítica

## Estado
Closed

## Entorno
- Navegador: Google Chrome
- Sistema Operativo: Windows 10
- Ambiente: Producción / Vercel

## Descripción
El sistema no permite iniciar sesión con usuarios previamente registrados y muestra mensaje de credenciales inválidas.

## Precondiciones
Usuario registrado correctamente en el sistema.

## Pasos para reproducir
1. Abrir página de login.
2. Ingresar email válido de usuario registrado.
3. Ingresar contraseña válida.
4. Presionar botón "Ingresar".

## Resultado Esperado
El usuario debería acceder correctamente al sistema.

## Resultado Actual
El sistema muestra mensaje de credenciales inválidas y no permite acceder.

## Impacto
Los usuarios registrados no pueden acceder a sus cuentas.

## Evidencia
Pendiente de adjuntar screenshot.

## Observaciones
Se recomienda validar lógica de autenticación y persistencia de usuarios registrados.