## Credenciales de Prueba

### Admin
- Email: admin@library.com
- Password: admin123

### Usuario Regular
- Email: user@library.com
- Password: user123

## Flujos de Prueba

1. **Login y Autenticación**
   - Iniciar sesión como admin
   - Iniciar sesión como usuario regular
   - Verificar redirección apropiada

2. **Gestión de Libros (Admin)**
   - Ver lista de libros
   - Agregar nuevo libro
   - Editar libro existente
   - Eliminar libro

3. **Catálogo de Libros (Usuario)**
   - Buscar libros
   - Ver detalles de libro
   - Solicitar préstamo
   - Realizar reserva

4. **Gestión de Usuarios (Admin)**
   - Ver lista de usuarios
   - Editar usuario
   - Eliminar usuario
   - Ver estadísticas

5. **Perfil de Usuario**
   - Ver historial de préstamos
   - Ver préstamos activos
   - Devolver libro

## Casos de Prueba Específicos

### Préstamo de Libros
1. Verificar que solo usuarios autenticados pueden solicitar préstamos
2. Verificar que no se puede prestar un libro no disponible
3. Verificar la actualización del estado del libro después del préstamo

### Devolución de Libros
1. Verificar que solo el usuario que tomó prestado puede devolver
2. Verificar la actualización del estado del libro después de la devolución
3. Verificar la actualización del historial de préstamos

### Búsqueda de Libros
1. Buscar por título
2. Buscar por autor
3. Filtrar por categoría
4. Verificar resultados combinados