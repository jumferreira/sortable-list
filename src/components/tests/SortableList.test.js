import { render, screen, fireEvent } from '@testing-library/vue';
import SortableList from '../SortableList.vue'

const postList = [];
for (let i = 0; i < 5; i ++) {
  postList.push({
    userId: 1,
    id: i + 1,
    title: 'title',
    body: 'body',
  })
}

describe('Testing Sorting posts app', () => {
  const props = { postList };

  it('Structures exists', async () => {
    await render(SortableList, { props });

    expect(screen.getByTestId('sortable-post-column')).toBeInTheDocument();
    expect(screen.getByTestId('commits-column')).toBeInTheDocument();
  });

  it('Posts are visible', async () => {
    await render(SortableList, { props });
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`post_list_${i}`)).toBeInTheDocument();
    }
  });

  it('There is no commit visible', async () => {
    await render(SortableList, { props });
    expect(screen.getByTestId('no_commit_message')).toBeInTheDocument();
  });

  it('Posts title are visible and correct', async () => {
    await render(SortableList, { props });
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(`Post ${i}`)).toBeInTheDocument();
    }
  });

  it('When clicking the first post, a commit message should appear', async () => {
    await render(SortableList, { props });
    await fireEvent.click(screen.getByTestId('post_0_button_down'));
    expect(screen.getByTestId('commit_item_0')).toBeInTheDocument();

    expect(screen.getByTestId('post_list_0')).toHaveTextContent('Post 2');
    expect(screen.getByTestId('post_list_1')).toHaveTextContent('Post 1');
    await fireEvent.click(screen.getByTestId('time_travel_button_0'));
  });

  it("When clicking the 'Time travel' button, the commit message will disappear", async () => {
    await render(SortableList, { props });
    await fireEvent.click(screen.getByTestId('post_0_button_down'));
    expect(screen.getByTestId('commit_item_0')).toBeInTheDocument();
    expect(screen.getByTestId('post_list_0')).toHaveTextContent('Post 2');
    expect(screen.getByTestId('post_list_1')).toHaveTextContent('Post 1');

    await fireEvent.click(screen.getByTestId('time_travel_button_0'));
    expect(screen.getByTestId('no_commit_message')).toBeInTheDocument();
    expect(screen.getByTestId('post_list_0')).toHaveTextContent('Post 1');
    expect(screen.getByTestId('post_list_1')).toHaveTextContent('Post 2');
  });
})
