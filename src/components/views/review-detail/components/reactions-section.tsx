import React from 'react';
import { ReactionGrid } from './reaction-grid';
import { SectionContainer } from './section-container';

interface ReviewReactions {
  overall: number;
  nice: number;
  love_it: number;
  funny: number;
  confusing: number;
  informative: number;
  well_written: number;
  creative: number;
}

interface ReactionsSectionProps {
  reactions: ReviewReactions;
}

export const ReactionsSection = ({ reactions }: ReactionsSectionProps) => {
  return (
    <SectionContainer title="Reactions">
      <ReactionGrid reactions={reactions} />
    </SectionContainer>
  );
};
