import { type ApiSchemas } from '../../schema';
import { http } from '../http';
import { HttpResponse } from 'msw';
import { verifyTokenOrThrow } from '../session';

const now = new Date().toISOString();

const boards: ApiSchemas['Board'][] = [
  {
    id: 'board-1',
    name: 'Marketing Campaign',
    createdAt: now,
    updatedAt: now,
    lastOpenedAt: now,
    isFavorite: false,
  },
  {
    id: 'board-2',
    name: 'Product Roadmap',
    createdAt: now,
    updatedAt: now,
    lastOpenedAt: now,
    isFavorite: false,
  },
];

export const boardsHandlers = [
  http.get('/boards', async (ctx) => {
    await verifyTokenOrThrow(ctx.request);
    return HttpResponse.json(boards);
  }),

  http.get('/boards/{boardId}', async ({ params, request }) => {
    await verifyTokenOrThrow(request);
    const { boardId } = params;
    const board = boards.find((board) => board.id === boardId);

    if (!board) {
      return HttpResponse.json(
        { message: 'Board not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }
    return HttpResponse.json(board);
  }),

  http.post('/boards', async (ctx) => {
    await verifyTokenOrThrow(ctx.request);

    const now = new Date().toISOString();
    const board: ApiSchemas['Board'] = {
      id: crypto.randomUUID(),
      name: 'New Board',
      createdAt: now,
      updatedAt: now,
      lastOpenedAt: now,
      isFavorite: false,
    };

    boards.push(board);
    return HttpResponse.json(board, { status: 201 });
  }),

  http.put('/boards/{boardId}/favorite', async ({ params, request }) => {
    await verifyTokenOrThrow(request);
    const { boardId } = params;
    const board = boards.find((board) => board.id === boardId);

    if (!board) {
      return HttpResponse.json(
        { message: 'Board not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const data = (await request.json()) as ApiSchemas['UpdateBoardFavorite'];
    board.isFavorite = data.isFavorite;
    board.updatedAt = new Date().toISOString();

    return HttpResponse.json(board, { status: 201 });
  }),

  http.put('/boards/{boardId}/rename', async ({ params, request }) => {
    await verifyTokenOrThrow(request);
    const { boardId } = params;
    const board = boards.find((board) => board.id === boardId);

    if (!board) {
      return HttpResponse.json(
        { message: 'Board not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const data = (await request.json()) as ApiSchemas['RenameBoard'];
    board.name = data.name;
    board.updatedAt = new Date().toISOString();

    return HttpResponse.json(board, { status: 201 });
  }),

  http.delete('/boards/{boardId}', async ({ params, request }) => {
    await verifyTokenOrThrow(request);
    const { boardId } = params;
    const index = boards.findIndex((board) => board.id === boardId);

    if (index === -1) {
      return HttpResponse.json(
        { message: 'Board not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    boards.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
