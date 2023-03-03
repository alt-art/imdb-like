import { Review } from '@prisma/client';

export function calculateRating(reviews: Review[]) {
  const total = reviews.length;
  const positive = reviews.filter(
    (review) => review.type === 'POSITIVE',
  ).length;
  const neutral = reviews.filter((review) => review.type === 'NEUTRAL').length;
  return ((positive + neutral / 2) / total) * 100;
}

export function calculatePopularity(reviews: Review[], createdAt: Date) {
  const now = new Date();
  const daysSinceCreation =
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  return reviews.length * 0.89 ** daysSinceCreation;
}
