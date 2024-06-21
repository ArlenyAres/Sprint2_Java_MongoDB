db.createCollection('Cliente', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'Cliente',
            required: ['nombre', 'direccion', 'fechaRegistro', 'telefono', 'email', 'recomendadoPor', 'ultimaCompra'],
            properties: {
                nombre: {
                    bsonType: 'string'
                },
                direccion: {
                    bsonType: 'array',
                    items: {
                        title: 'object',
                        required: ['calle', 'numero', 'piso', 'puerta', 'CodigoPostal', 'pais'],
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
                            puerta: {
                                bsonType: 'string'
                            },
                            CodigoPostal: {
                                bsonType: 'int'
                            },
                            pais: {
                                bsonType: 'string'
                            }
                        }
                    }
                },
                fechaRegistro: {
                    bsonType: 'date'
                },
                telefono: {
                    bsonType: 'string'
                },
                email: {
                    bsonType: 'string'
                },
                recomendadoPor: {
                    bsonType: 'string'
                },
                ultimaCompra: {
                    bsonType: 'array',
                    items: {
                        title: 'object',
                        required: ['producto', 'clienteID', 'vendedorID', 'fechaCompra', 'gafas'],
                        properties: {
                            producto: {
                                bsonType: 'array',
                                items: {
                                    title: 'object',
                                    required: ['gafas'],
                                    properties: {
                                        gafas: {
                                            bsonType: 'object',
                                            title: 'object',
                                            required: ['marca', 'precio', 'monturaTipo', 'colorCristal', 'graduacion'],
                                            properties: {
                                                marca: {
                                                    bsonType: 'object',
                                                    title: 'object',
                                                    required: ['nombre', 'proveedor'],
                                                    properties: {
                                                        nombre: {
                                                            bsonType: 'string'
                                                        },
                                                        proveedor: {
                                                            bsonType: 'array',
                                                            items: {
                                                                title: 'object',
                                                                required: ['nombre', 'telefono', 'nif', 'direccion'],
                                                                properties: {
                                                                    nombre: {
                                                                        bsonType: 'string'
                                                                    },
                                                                    telefono: {
                                                                        bsonType: 'string'
                                                                    },
                                                                    fax: {
                                                                        bsonType: 'string'
                                                                    },
                                                                    nif: {
                                                                        bsonType: 'string'
                                                                    },
                                                                    direccion: {
                                                                        bsonType: 'array',
                                                                        items: {
                                                                            title: 'object',
                                                                            required: ['calle', 'numero', 'ciudad', 'codigoPostal'],
                                                                            properties: {
                                                                                calle: {
                                                                                    bsonType: 'string'
                                                                                },
                                                                                numero: {
                                                                                    bsonType: 'int'
                                                                                },
                                                                                piso: {
                                                                                    bsonType: 'string'
                                                                                },
                                                                                puerta: {
                                                                                    bsonType: 'string'
                                                                                },
                                                                                ciudad: {
                                                                                    bsonType: 'string'
                                                                                },
                                                                                codigoPostal: {
                                                                                    bsonType: 'int'
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                precio: {
                                                    bsonType: 'double'
                                                },
                                                monturaTipo: {
                                                    bsonType: 'array',
                                                    items: {
                                                        bsonType: 'enum'
                                                    }
                                                },
                                                colorCristal: {
                                                    bsonType: 'array',
                                                    items: {
                                                        title: 'object',
                                                        properties: {
                                                            derecha: {
                                                                bsonType: 'string'
                                                            },
                                                            izquierda: {
                                                                bsonType: 'string'
                                                            }
                                                        }
                                                    }
                                                },
                                                graduacion: {
                                                    bsonType: 'array',
                                                    items: {
                                                        title: 'object',
                                                        required: ['izquierda', 'derecha'],
                                                        properties: {
                                                            izquierda: {
                                                                bsonType: 'double'
                                                            },
                                                            derecha: {
                                                                bsonType: 'double'
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            clienteID: {
                                bsonType: 'objectId'
                            },
                            vendedorID: {
                                bsonType: 'objectId'
                            },
                            fechaCompra: {
                                bsonType: 'date'
                            },
                            gafas: {
                                bsonType: 'objectId'
                            }
                        }
                    }
                }
            }
        }
    }
});