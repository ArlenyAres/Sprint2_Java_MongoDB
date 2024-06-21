### Estructura y Relaciones del Esquema JSON

El esquema JSON es un ejemplo de un diseño de base de datos NoSQL para MongoDB.

Aquí los diferentes componentes, su relación y por qué se estructura de esta manera.

#### Nivel Superior: Colección `Clientes`

La colección `Clientes` es la colección principal que almacena información sobre los clientes de una óptica.

```json
{
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'Clientes',
      required: ['nombre', 'direccion', 'telefono', 'email', 'fechaRegistro', 'compras'],
      properties: {
        ...
      }
    }
  }
}
```

- **bsonType**: Define el tipo de datos BSON (Binary JSON) esperado, en este caso, un objeto (`object`).
- **title**: Un título descriptivo para el esquema.
- **required**: Lista de campos que son obligatorios en cada documento de la colección.
- **properties**: Define las propiedades (campos) del objeto.

#### Propiedades del Cliente

1. **nombre**
2. **direccion**
3. **telefono**
4. **email**
5. **fechaRegistro**
6. **recomendadoPor** (opcional)
7. **compras**

Cada campo tiene un tipo de datos especificado, como `string` para cadenas de texto o `object` para objetos anidados.

#### Campo `direccion`

El campo `direccion` es un objeto anidado que contiene información sobre la dirección del cliente.

```json
direccion: {
  bsonType: 'object',
  required: ['calle', 'numero', 'ciudad', 'codigoPostal', 'pais'],
  properties: {
    calle: { bsonType: 'string' },
    numero: { bsonType: 'string' },
    piso: { bsonType: 'string' },
    puerta: { bsonType: 'string' },
    ciudad: { bsonType: 'string' },
    codigoPostal: { bsonType: 'string' },
    pais: { bsonType: 'string' }
  }
}
```

- **Objeto anidado**: Estructurado para representar la jerarquía de la dirección.
- **Propiedades**: Campos individuales dentro del objeto `direccion`.

#### Campo `compras`

El campo `compras` es otro objeto anidado que almacena información sobre las compras realizadas por el cliente.

```json
compras: {
  bsonType: 'object',
  required: ['clienteID', 'gafasID', 'empleadoID', 'fechaOrden'],
  properties: {
    ...
  }
}
```

- **Objeto anidado**: Representa las compras realizadas por el cliente.
- **Campos obligatorios**: `clienteID`, `gafasID`, `empleadoID`, `fechaOrden`.

#### Detalles de la Compra: Campo `productos`

Dentro de `compras`, el campo `productos` contiene detalles específicos de los productos adquiridos.

```json
productos: {
  bsonType: 'object',
  properties: {
    gafas: {
      bsonType: 'object',
      required: ['marca', 'colorVidrio', 'tipoMontura', 'precio'],
      properties: {
        ...
      }
    }
  }
}
```

#### Detalles del Producto: Campo `gafas`

El campo `gafas` es un objeto que contiene detalles sobre las gafas adquiridas, incluyendo la marca, el color del vidrio, el tipo de montura y el precio.

```json
gafas: {
  bsonType: 'object',
  required: ['marca', 'colorVidrio', 'tipoMontura', 'precio'],
  properties: {
    ...
  }
}
```

### Relación entre Entidades

1. **Clientes y Compras**: Cada cliente puede tener múltiples compras, por lo que `compras` es un objeto anidado dentro del documento de un cliente.
2. **Compras y Productos**: Cada compra puede incluir múltiples productos, por lo que `productos` es un objeto anidado dentro de `compras`.
3. **Productos y Proveedores**: Cada producto tiene una relación con un proveedor, que se describe dentro de los detalles del producto (campo `proveedor` dentro de `marca`).

### ¿Por Qué Estructurar Así?

1. **Flexibilidad**: MongoDB es una base de datos NoSQL que permite una estructura flexible y anidada. Esto es útil para representar relaciones complejas sin la necesidad de múltiples tablas y uniones como en las bases de datos relacionales.
2. **Desempeño**: Las consultas pueden ser más rápidas y eficientes al tener datos relacionados en un solo documento, eliminando la necesidad de realizar múltiples uniones.
3. **Modelo de Documento**: El modelo de documento en MongoDB es más intuitivo y natural para representar objetos complejos y anidados, como la información de un cliente y sus compras.

### Resumen

La estructura JSON proporcionada es un esquema de validación en MongoDB que asegura la integridad y la consistencia de los datos insertados en la colección `Clientes`. Define claramente la relación entre clientes, sus direcciones, las compras realizadas, y los detalles específicos de cada compra, incluidos los productos y sus proveedores. Este enfoque aprovecha la flexibilidad de MongoDB para manejar datos anidados y relacionados de manera eficiente y natural.



Verificar la creación de la colección
Para verificar que la colección Clientes se ha creado correctamente, puedes listar todas las colecciones en la base de datos:

```
show collections
```
O puedes verificar el esquema y las validaciones de la colección Clientes:


```
db.runCommand({
collMod: "Clientes",
validator: { $jsonSchema: { ... } }
})
```


Verificar los documentos insertados
Para verificar que los documentos se han insertado correctamente, puedes realizar una consulta en la colección:


```
db.Clientes.find().pretty()
```

### Relaciones entre Colecciones
#### Clientes -> Ventas: 
Cada cliente puede tener múltiples registros en la colección Ventas que documentan sus compras.
#### Gafas -> Ventas: 
Cada documento en Ventas hace referencia a las gafas específicas vendidas.
#### Empleados -> Ventas: 
 Si se incluye una colección de empleados (Empleados), cada venta registraría quién fue el empleado responsable de la venta.
 #### Proveedores -> Gafas: 
Si se incluye la colección de Proveedores, se establecería una relación entre los proveedores y las gafas suministradas por ellos.

#### Ejemplo de Consulta Relacional
Para obtener información detallada sobre las ventas de un cliente específico, se podría realizar una consulta como esta:

```
db.Ventas.find({ clienteID: ObjectId("id_del_cliente") })
.populate('gafasID') // Hipotético: Se usaría populate si se usara Mongoose en un entorno Node.js
.populate('empleadoID')
.exec(function(err, ventas) {
if (err) throw err;
console.log(ventas);
});
```