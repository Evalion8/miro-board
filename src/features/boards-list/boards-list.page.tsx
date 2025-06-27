import { rqClient } from '@/shared/api/instance';
import { ROUTES } from '@/shared/model/routes';
import { useQueryClient } from '@tanstack/react-query';
import { Link, generatePath } from 'react-router-dom';
import { Card, CardHeader, CardFooter } from '@/shared/ui/kit/card';
import { Button } from '@/shared/ui/kit/button';

function BoardsListPage() {
  const queryClient = useQueryClient();
  const boardsQuery = rqClient.useQuery('get', '/boards');
  const createBoardMutation = rqClient.useMutation('post', '/boards', {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/boards')
      );
    },
  });
  const deleteBoardMutation = rqClient.useMutation(
    'delete',
    '/boards/{boardId}',
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions('get', '/boards')
        );
      },
    }
  );

  if (boardsQuery.isLoading) return <div>Loading...</div>;
  if (boardsQuery.isError) return <div>Error loading boards.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1>Boards list</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          createBoardMutation.mutate({
            body: { name: formData.get('name') as string },
          });
        }}>
        <input name="name" />
        <button type="submit" disabled={createBoardMutation.isPending}>
          Create
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {boardsQuery.data?.map((board) => (
          <Card key={board.id}>
            <CardHeader>
              <Button asChild variant="link">
                <Link to={generatePath(ROUTES.BOARD, { boardId: board.id })}>
                  {board.name}
                </Link>
              </Button>
            </CardHeader>
            <CardFooter>
              <Button
                variant="destructive"
                disabled={deleteBoardMutation.isPending}
                onClick={() =>
                  deleteBoardMutation.mutate({
                    params: { path: { boardId: board.id } },
                  })
                }>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export const Component = BoardsListPage;
