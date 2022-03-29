import swaggerjsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerjsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cab booking app',
      version: '1.0.0',
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server',
      },
    ],

    basePath: '/',
    paths: {
      '/auth/register': {
        post: {
          tags: ['Authantication'],
          description: 'Create new user in system',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      example: 'hello@gmail.com',
                    },

                    role: {
                      type: 'string',
                      example: 'USER, CAB',
                    },
                    password: {
                      type: 'string',
                      example: 'test1234',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'New user is created',
            },
          },
        },
      },
      '/auth/login': {
        post: {
          tags: ['Authantication'],
          description: 'login user in system',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      example: 'hello@gmail.com',
                    },
                    password: {
                      type: 'string',
                      example: 'test1234',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'user will login in system',
            },
          },
        },
      },
      '/auth/forgot password/:reset password token': {
        post: {
          tags: ['Authantication'],
          description: 'forgot password',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    newPassword: {
                      type: 'string',
                      example: '123456',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'change password for user',
            },
          },
        },
      },
      '/auth/reset password': {
        post: {
          tags: ['Authantication'],
          description: 'reset password',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      example: 'hello@gmail.com',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'user get reset password token',
            },
          },
        },
      },
      '/cab/createBooking': {
        post: {
          tags: ['Cab'],
          description: 'create cab Booking',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    pickupAddress: {
                      type: 'array',
                      example: {
                        coordinates: [23.218964, 71.960515],
                        address: 'goa',
                      },
                    },
                    dropAddress: {
                      type: 'array',
                      example: {
                        coordinates: [23.218964, 71.960515],
                        address: 'goa',
                      },
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'create booking with nearby cab',
            },
          },
        },
      },
      '/cab/deleteBooking/:id': {
        post: {
          tags: ['Cab'],
          description: 'delete cab Booking',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: false,
            content: {
              'application/json': {},
            },
          },
          responses: {
            '200': {
              description: 'delete booking with booking id',
            },
          },
        },
      },
      '/cab/pastBooking': {
        post: {
          tags: ['Cab'],
          description: 'get past cab Booking',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: false,
            content: {
              'application/json': {},
            },
          },
          responses: {
            '200': {
              description: 'user get past cab bookings',
            },
          },
        },
      },
      '/cab/getNearbyCab': {
        post: {
          tags: ['Cab'],
          description: 'get Near by cabs',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    lat: {
                      type: 'string',
                      example: '23.218964',
                    },
                    long: {
                      type: 'string',
                      example: '72.366911',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'get nearby cabs',
            },
          },
        },
      },
      '/cabRequset/registerCab': {
        post: {
          tags: ['Cab Request'],
          description: 'register cab',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    location: {
                      type: 'array',
                      example: {
                        coordinates: [26.606198, 84.834574],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'get nearby cabs',
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Cab Booking',
    },
  ],

  apis: ['./modules/routes.ts'],
};
const swaggerDocs = swaggerjsdoc(swaggerOptions);

export default swaggerDocs;
