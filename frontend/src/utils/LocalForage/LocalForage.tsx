import localForage from "localforage";

const commentsStore = localForage.createInstance({
  name: "commentsStore",
});

const ratingsStore = localForage.createInstance({
  name: "ratingsStore",
});

export const saveCommentToIndexedDB = async (
  movieId: string,
  comment: { userId: string; userName: string; comment: string }
) => {
  const existingComments: {
    userId: string;
    userName: string;
    comment: string;
  }[] = (await commentsStore.getItem(movieId)) || [];
  await commentsStore.setItem(movieId, [...existingComments, comment]);
};

export const getCommentsFromIndexedDB = async (
  movieId: string
): Promise<{ userId: string; userName: string; comment: string }[]> => {
  return (await commentsStore.getItem(movieId)) || [];
};

export const saveRatingToIndexedDB = async (
  movieId: string,
  rating: { userId: string; userName: string; rating: number }
) => {
  const existingRatings: {
    userId: string;
    userName: string;
    rating: number;
  }[] = (await ratingsStore.getItem(movieId)) || [];
  const updatedRatings = existingRatings.filter(
    (r) => r.userId !== rating.userId
  );
  updatedRatings.push(rating);
  await ratingsStore.setItem(movieId, updatedRatings);
};

export const getRatingsFromIndexedDB = async (
  movieId: string
): Promise<{ userId: string; userName: string; rating: number }[]> => {
  return (await ratingsStore.getItem(movieId)) || [];
};
