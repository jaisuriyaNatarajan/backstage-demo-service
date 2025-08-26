// components/cards/TemplateCard.tsx
import React from 'react';
import styled from 'styled-components';
import { Star, Info } from 'lucide-react';

const TOKENS = {
  radiusLg: '16px',
  radiusSm: '10px',
  radiusRound: '999px',
  border: '1px solid #E9E9EE',
  surface: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  divider: '#EAEAF0',
  tagBg: '#F1EFFE',
  tagText: '#9F3ED5',
  iconChipBorder: '#E9E9EE',
  iconChipBg: '#FFFFFF',
  link: '#9F3ED5',
  cta: '#9F3ED5',
  ctaHover: '#9F3ED5',
  shadowRest: '0 0 0 1px rgba(0, 0, 0, 0.02)',
  shadowHover:
    '0 14px 28px rgba(17, 24, 39, 0.12), 0 8px 12px rgba(17, 24, 39, 0.06)',
  glow: 'rgba(124, 58, 237, 0.18)',
  glowSoft: 'rgba(124, 58, 237, 0.10)',
};

const Card = styled.article`
  position: relative;
  isolation: isolate;
  background: ${TOKENS.surface};
  border: ${TOKENS.border};
  border-radius: ${TOKENS.radiusLg};
  padding: 20px;
  width: 100%;
  max-width: 560px;
  box-shadow: ${TOKENS.shadowRest};
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto,
    'Helvetica Neue', Arial, 'Noto Sans';
  will-change: transform, box-shadow;
  transition: transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 180ms cubic-bezier(0.2, 0.8, 0.2, 1);

  --mx: 50%;
  --my: 30%;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px) scale(1.01);
      box-shadow: ${TOKENS.shadowHover};
    }
  }

  &:focus-within {
    transform: translateY(-4px) scale(1.01);
    box-shadow: ${TOKENS.shadowHover};
  }

  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 220ms ease;
    z-index: -1;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover::after {
      opacity: 1;
    }
  }

  &:focus-within::after {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: box-shadow 120ms ease;
    transform: none !important;
    &:hover,
    &:focus-within {
      transform: none !important;
      box-shadow: 0 6px 12px rgba(17, 24, 39, 0.1);
    }
    &::after {
      display: none;
    }
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 12px;
  border-radius: ${TOKENS.radiusRound};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  background: ${TOKENS.tagBg};
  color: ${TOKENS.tagText};
`;

const IconTray = styled.div`
  display: inline-flex;
  gap: 10px;
`;

const IconChip = styled.button.attrs({ type: 'button' })`
  width: 36px;
  height: 36px;
  border-radius: ${TOKENS.radiusRound};
  border: 1px solid ${TOKENS.iconChipBorder};
  background: ${TOKENS.iconChipBg};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 10px rgba(17, 24, 39, 0.08);
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6b7280;
  }
`;

const Title = styled.h3`
  margin: 14px 0 8px 0;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 700;
  color: ${TOKENS.textPrimary};
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: ${TOKENS.divider};
  margin: 8px 0 14px 0;
`;

const SectionTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 700;
  color: ${TOKENS.textPrimary};
`;

const Paragraph = styled.p`
  margin: 0 0 10px 0;
  font-size: 14px;
  line-height: 1.45;
  color: ${TOKENS.textSecondary};
`;

const Footer = styled.footer`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const RepoText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${TOKENS.link};
`;

const ChooseBtn = styled.button.attrs({ type: 'button' })`
  padding: 12px 22px;
  border: 0;
  border-radius: ${TOKENS.radiusSm};
  background: ${TOKENS.cta};
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background 120ms ease, transform 120ms ease;

  &:hover {
    background: ${TOKENS.ctaHover};
    transform: translateY(-1px);
  }
`;

export type TemplateCardProps = {
  tag?: string;
  name?: string;
  section?: string;
  descriptionTop?: string;
  descriptionBottom?: string;
  repoText?: string;
  onStar?: () => void;
  onInfo?: () => void;
  onChoose?: () => void;
  isStarred?: boolean;
};

export default function TemplateCard({
  tag = 'Website',
  name = 'Template Name',
  section = 'Title',
  descriptionTop = '',
  descriptionBottom = '',
  repoText = 'backstage/maintainers',
  onStar,
  onInfo,
  onChoose,
  isStarred,
}: TemplateCardProps) {
  const handleMouseMove: React.MouseEventHandler<HTMLElement> = e => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLElement> = e => {
    (e.currentTarget as HTMLElement).style.setProperty('--mx', '50%');
    (e.currentTarget as HTMLElement).style.setProperty('--my', '30%');
  };

  return (
    <Card onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <TopRow>
        <Tag>{tag}</Tag>
        <IconTray>
          <IconChip aria-label="Star" onClick={onStar}>
            <Star strokeWidth={2} color={isStarred ? '#f59e0b' : undefined} />
          </IconChip>
          <IconChip aria-label="Info" onClick={onInfo}>
            <Info strokeWidth={2} />
          </IconChip>
        </IconTray>
      </TopRow>

      <Title>{name}</Title>
      <Divider />

      <SectionTitle>{section}</SectionTitle>
      {descriptionTop && <Paragraph>{descriptionTop}</Paragraph>}
      {descriptionBottom && <Paragraph>{descriptionBottom}</Paragraph>}

      <Footer>
        <RepoText>{repoText}</RepoText>
        <ChooseBtn onClick={onChoose}>Choose</ChooseBtn>
      </Footer>
    </Card>
  );
}
