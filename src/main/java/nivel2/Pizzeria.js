db.createCollection('pizzeria', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'pizzeria',
            required: ['nombre', 'pedido', 'direccion', 'codigoPostal', 'localidad', 'provincia'],
            properties: {
                nombre: {
                    bsonType: 'string'
                },
                pedido: {
                    bsonType: 'object',
                    title: 'object',
                    required: ['id_pedido', 'products', 'cliente', 'tipo'],
                    properties: {
                        id_pedido: {
                            bsonType: 'int'
                        },
                        products: {
                            bsonType: 'object',
                            title: 'object',
                            required: ['tipo', 'nombre', 'cantidad', 'descripcion', 'imagen', 'categoria'],
                            properties: {
                                tipo: {
                                    enum: ['takeAway','delivery'],
                                },
                                nombre: {
                                    bsonType: 'string'
                                },
                                cantidad: {
                                    bsonType: 'int'
                                },
                                descripcion: {
                                    bsonType: 'string'
                                },
                                imagen: {
                                    bsonType: 'string'
                                },
                                categoria: {
                                    bsonType: 'string'
                                }
                            }
                        },
                        cliente: {
                            bsonType: 'object',
                            title: 'object',
                            required: ['id_cliente', 'nombre', 'apellido', 'direccion'],
                            properties: {
                                id_cliente: {
                                    bsonType: 'int'
                                },
                                nombre: {
                                    bsonType: 'string'
                                },
                                apellido: {
                                    bsonType: 'string'
                                },
                                direccion: {
                                    bsonType: 'object',
                                    title: 'object',
                                    required: ['calle', 'numero', 'piso', 'telefono'],
                                    properties: {
                                        calle: {
                                            bsonType: 'string'
                                        },
                                        numero: {
                                            bsonType: 'int'
                                        },
                                        piso: {
                                            bsonType: 'int'
                                        },
                                        telefono: {
                                            bsonType: 'int'
                                        },
                                        comementario: {
                                            bsonType: 'string'
                                        }
                                    }
                                }
                            }
                        },
                        tipo: {
                            enum: ['takeAway','delivery'],
                        },
                        paraLlevar: {
                            bsonType: 'bool'
                        },
                        pago: {
                            bsonType: 'bool'
                        }
                    }
                },
                direccion: {
                    bsonType: 'string'
                },
                codigoPostal: {
                    bsonType: 'string'
                },
                localidad: {
                    bsonType: 'string'
                },
                provincia: {
                    bsonType: 'string'
                }
            }
        }
    }
});
