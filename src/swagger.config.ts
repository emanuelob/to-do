import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('TO-DO List')
    .setDescription('API para gerenciamento de tarefas')
    .setVersion('1.0')
    .addTag('Pagina Inicial', 'Endpoint da rota principal')
    .addTag('Categorias', 'Endpoints relacionados a categorias de tarefas')
    .addTag('Tarefas', 'Endpoints relacionados a tarefas')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const paginaInicialOperations = [
    {
      path: '/',
      method: 'GET',
      operation: {
        tags: ['Pagina Inicial'],
        summary: 'Obter mensagem de boas-vindas',
        description: 'Retorna uma mensagem de boas-vindas do sistema',
        operationId: 'getHello',
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Bem-vindo ao meu gerenciador de tarefas, TO DO!',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  ];

  const categoriaOperations = [
    {
      path: '/categoria',
      method: 'POST',
      operation: {
        tags: ['Categorias'],
        summary: 'Criar uma nova categoria',
        description: 'Cria uma nova categoria de tarefas',
        operationId: 'createCategoria',
        requestBody: {
          description: 'Campos necessários para se criar uma Categoria',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateCategoriaDto',
              },
              example: {
                nome: 'Nome da Categoria',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Succesful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CategoriaEntity',
                },
                example: {
                  categoria: {
                    id: 1,
                    nome: 'Nome da Categoria',
                    createdAt: '2024-02-07T02:42:46.682Z',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      path: '/categoria',
      method: 'GET',
      operation: {
        tags: ['Categorias'],
        summary: 'Obter todas as categorias',
        description: 'Retorna todas as categorias de tarefas cadastradas no sistema',
        operationId: 'findAllCategorias',
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/CategoriaEntity',
                  },
                },
                example: [
                  {
                    id: 1,
                    nome: 'Categoria 1',
                    createdAt: '2024-02-07T02:42:46.682Z',
                  },
                  {
                    id: 2,
                    nome: 'Categoria 2',
                    createdAt: '2024-02-07T02:42:46.682Z',
                  },
                ],
              },
            },
          },
        },
      },
    },
    {
      path: '/categoria/{categoriaId}',
      method: 'GET',
      operation: {
        tags: ['Categorias'],
        summary: 'Obter uma categoria pelo ID',
        description: 'Retorna uma categoria de tarefas pelo seu ID',
        operationId: 'findOneCategoria',
        parameters: [
          {
            name: 'categoriaId',
            in: 'path',
            description: 'ID da categoria a ser retornada',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CategoriaEntity',
                },
                example: {
                  id: 1,
                  nome: 'Nome da Categoria',
                  createdAt: '2024-02-07T02:42:46.682Z',
                },
              },
            },
          },
        },
      },
    },
    {
      path: '/categoria/{categoriaId}',
      method: 'PATCH',
      operation: {
        tags: ['Categorias'],
        summary: 'Atualizar uma categoria existente',
        description: 'Atualiza os dados de uma categoria de tarefas existente pelo seu ID',
        operationId: 'updateCategoria',
        parameters: [
          {
            name: 'categoriaId',
            in: 'path',
            description: 'ID da categoria a ser atualizada',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        requestBody: {
          description: 'Dados necessários para se atualizar uma categoria',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateCategoriaDto',
              },
              example: {
                nome: 'Novo Nome da Categoria',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CategoriaEntity',
                },
                example: {
                  id: 1,
                  nome: 'Novo Nome da Categoria',
                  createdAt: '2024-02-07T02:42:46.682Z',
                },
              },
            },
          },
        },
      },
    },
    {
      path: '/categoria/{categoriaId}',
      method: 'DELETE',
      operation: {
        tags: ['Categorias'],
        summary: 'Deletar uma categoria',
        description: 'Deleta uma categoria de tarefas pelo seu ID',
        operationId: 'deleteCategoria',
        parameters: [
          {
            name: 'categoriaId',
            in: 'path',
            description: 'ID da categoria a ser deletada',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CategoriaEntity',
                },
                example: {
                  id: 1,
                  nome: 'Nome da Categoria',
                  createdAt: '2024-02-07T02:42:46.682Z',
                },
              },
            },
          },
        },
      },
    },
  ];

  const tarefaOperations = [
    {
      path: '/tarefa',
      method: 'POST',
      operation: {
        tags: ['Tarefas'],
        summary: 'Adicionar uma nova tarefa',
        description: 'Cria uma nova tarefa',
        operationId: 'addTarefa',
        requestBody: {
          description: 'Campos necessários para criar uma tarefa',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateTarefaDto',
              },
              example: {
                nome: 'Nome da Tarefa',
                categoriaId: 1,
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TarefaEntity',
                },
                example: {
                  tarefa: {
                    id: 9,
                    nome: 'Nome da Tarefa',
                    categoriaId: 1,
                    isActive: true,
                    createdAt: '2024-02-07T02:42:46.682Z',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      path: '/tarefa',
      method: 'GET',
      operation: {
        tags: ['Tarefas'],
        summary: 'Obter todas as tarefas',
        description: 'Retorna todas as tarefas cadastradas no sistema',
        operationId: 'findAllTarefas',
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/TarefaEntity',
                  },
                },
                example: [
                  {
                    id: 1,
                    nome: 'Tarefa 1',
                    categoriaId: 1,
                    isActive: true,
                    createdAt: '2024-02-07T02:42:46.682Z',
                  },
                  {
                    id: 2,
                    nome: 'Tarefa 2',
                    categoriaId: 2,
                    isActive: true,
                    createdAt: '2024-02-07T02:42:46.682Z',
                  },
                ],
              },
            },
          },
        },
      },
    },
    {
      path: '/tarefa/{tarefaId}',
      method: 'GET',
      operation: {
        tags: ['Tarefas'],
        summary: 'Obter uma tarefa pelo ID',
        description: 'Retorna uma tarefa pelo seu ID',
        operationId: 'getTarefaById',
        parameters: [
          {
            name: 'tarefaId',
            in: 'path',
            description: 'ID da tarefa a ser retornada',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
          {
            name: 'isActive',
            in: 'query',
            description: 'Filtro para tarefas ativas ou inativas (true/false)',
            schema: {
              type: 'boolean',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TarefaEntity',
                },
                example: {
                  id: 9,
                  nome: 'Nome da Tarefa',
                  categoriaId: 1,
                  isActive: true,
                  createdAt: '2024-02-07T02:42:46.682Z',
                },
              },
            },
          },
        },
      },
    },
    {
      path: '/tarefa/filtro',
      method: 'GET',
      operation: {
        tags: ['Tarefas'],
        summary: 'Obter tarefas por status',
        description: 'Retorna todas as tarefas ativas ou inativas',
        operationId: 'getTarefasByStatus',
        parameters: [
          {
            name: 'isActive',
            in: 'query',
            description: 'Filtro para tarefas ativas ou inativas (true/false)',
            required: true,
            schema: {
              type: 'boolean',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/TarefaEntity',
                  },
                },
                example: [
                  {
                    id: 1,
                    nome: 'Tarefa 1',
                    categoriaId: 1,
                    isActive: true,
                    createdAt: '2024-02-07T02:42:46.682Z',
                  },
                  {
                    id: 2,
                    nome: 'Tarefa 2',
                    categoriaId: 2,
                    isActive: true,
                    createdAt: '2024-02-07T02:42:46.682Z',
                  },
                ],
              },
            },
          },
        },
      },
    },
    {
      path: '/tarefa/categoria/{categoriaId}',
      method: 'GET',
      operation: {
        tags: ['Tarefas'],
        summary: 'Obter tarefas por categoria',
        description: 'Retorna todas as tarefas associadas a uma categoria pelo seu ID',
        operationId: 'getTarefasByCategoriaId',
        parameters: [
          {
            name: 'categoriaId',
            in: 'path',
            description: 'ID da categoria',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/TarefaEntity',
                  },
                },
                example: [
                  {
                    id: 1,
                    nome: 'Tarefa 1',
                    categoriaId: 1,
                    isActive: true,
                    createdAt: '2024-02-07T02:42:46.682Z',
                  },
                  {
                    id: 2,
                    nome: 'Tarefa 2',
                    categoriaId: 1,
                    isActive: true,
                    createdAt: '2024-02-07T02:42:46.682Z',
                  },
                ],
              },
            },
          },
        },
      },
    },
    {
      path: '/tarefa/{tarefaId}',
      method: 'PATCH',
      operation: {
        tags: ['Tarefas'],
        summary: 'Atualizar uma tarefa existente',
        description: 'Atualiza os dados de uma tarefa existente pelo seu ID',
        operationId: 'updateTarefa',
        parameters: [
          {
            name: 'tarefaId',
            in: 'path',
            description: 'ID da tarefa a ser atualizada',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        requestBody: {
          description: 'Campos a serem atualizados na tarefa',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateTarefaDto',
              },
              example: {
                nome: 'Nome atualizado',
                categoriaId: 2,
                isActive: false,
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TarefaEntity',
                },
                example: {
                  id: 9,
                  nome: 'Nome atualizado',
                  categoriaId: 2,
                  isActive: false,
                  createdAt: '2024-02-07T02:42:46.682Z',
                },
              },
            },
          },
        },
      },
    },
    {
      path: '/tarefa/{tarefaId}',
      method: 'DELETE',
      operation: {
        tags: ['Tarefas'],
        summary: 'Excluir uma tarefa pelo ID',
        description: 'Exclui uma tarefa existente pelo seu ID',
        operationId: 'deleteTarefa',
        parameters: [
          {
            name: 'tarefaId',
            in: 'path',
            description: 'ID da tarefa a ser excluída',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TarefaEntity',
                },
                example: {
                  id: 9,
                  nome: 'Tarefa excluída',
                  categoriaId: null,
                  isActive: false,
                  createdAt: '2024-02-07T02:42:46.682Z',
                },
              },
            },
          },
        },
      },
    },
    {
      path: '/tarefa/completas',
      method: 'DELETE',
      operation: {
        tags: ['Tarefas'],
        summary: 'Excluir todas as tarefas completas',
        description: 'Exclui todas as tarefas marcadas como completas',
        operationId: 'deleteTarefasCompletas',
        responses: {
          200: {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Todas as tarefas completas foram excluídas com sucesso.',
                    },
                    tarefasExcluidas: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/TarefaEntity',
                      },
                    },
                  },
                },
                example: {
                  message: 'Todas as tarefas completas foram excluídas com sucesso.',
                  tarefasExcluidas: [
                    {
                      id: 9,
                      nome: 'Tarefa excluída',
                      categoriaId: null,
                      isActive: false,
                      createdAt: '2024-02-07T02:42:46.682Z',
                    },
                    {
                      id: 10,
                      nome: 'Outra tarefa excluída',
                      categoriaId: null,
                      isActive: false,
                      createdAt: '2024-02-07T02:42:46.682Z',
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  ];

  paginaInicialOperations.forEach(({ path, method, operation }) => {
    document.paths[path] = document.paths[path] || {};
    document.paths[path][method.toLowerCase()] = operation;
  });

  categoriaOperations.forEach(({ path, method, operation }) => {
    document.paths[path] = document.paths[path] || {};
    document.paths[path][method.toLowerCase()] = operation;
  });

  tarefaOperations.forEach(({ path, method, operation }) => {
    document.paths[path] = document.paths[path] || {};
    document.paths[path][method.toLowerCase()] = operation;
  });

  document.components.schemas = {
    CategoriaEntity: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        nome: { type: 'string', example: 'Categoria 1' },
        createdAt: { type: 'string', format: 'date-time', example: '2024-01-31T12:00:00Z' },
        tarefas: {
          type: 'array',
          items: { $ref: '#/components/schemas/TarefaEntity' },
        },
      },
    },
    TarefaEntity: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        categoriaId: { type: 'integer', example: 1 },
        nome: { type: 'string', example: 'Tarefa 1' },
        isActive: { type: 'boolean', example: true },
        createdAt: { type: 'string', format: 'date-time', example: '2024-01-31T12:00:00Z' },
        updatedAt: { type: 'string', format: 'date-time', example: '2024-01-31T12:00:00Z' },
        categoria: { $ref: '#/components/schemas/CategoriaEntity' },
      },
    },
    CreateCategoriaDTO: {
      type: 'object',
      properties: {
        nome: { type: 'string', example: 'Nova Categoria' },
      },
    },
    UpdateCategoriaDTO: {
      type: 'object',
      properties: {
        nome: { type: 'string', example: 'Categoria Atualizada' },
      },
    },
    CreateTarefaDTO: {
      type: 'object',
      properties: {
        nome: { type: 'string', example: 'Nova Tarefa' },
        categoriaId: { type: 'integer', example: 1 },
      },
    },
    UpdateTarefaDTO: {
      type: 'object',
      properties: {
        nome: { type: 'string', example: 'Tarefa Atualizada' },
        categoriaId: { type: 'integer', example: 1 },
        isActive: { type: 'boolean', example: true },
      },
    },
  };

}