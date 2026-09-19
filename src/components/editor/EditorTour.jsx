import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, Check, GripHorizontal, X } from 'lucide-react';

const tourSteps = [
  {
    target: '[data-editor-tour="workspace-tabs"]',
    eyebrow: 'Your editing workspace',
    title: 'Choose what you want to refine',
    description: 'Move between Data, Style, and Engine. Each tab changes a different part of the letter without taking you away from the canvas.',
  },
  {
    target: '[data-editor-tour="sidebar"]',
    eyebrow: 'Letter inputs',
    title: 'Keep every detail accurate',
    description: 'Update contact information, employer details, skills, profile image, signature, and visual settings from this panel. Changes appear on the letter immediately.',
  },
  {
    target: '[data-editor-tour="template-layout"]',
    tab: 'design',
    eyebrow: 'Style and layout',
    title: 'Change the template layout',
    description: 'The tour has opened the Style tab for you. Select Change Template Layout to browse the complete library while preserving all of your letter content.',
  },
  {
    target: '[data-editor-tour="toolbar"]',
    eyebrow: 'Text formatting',
    title: 'Format selected text',
    description: 'Select text directly on the document, then use these controls for emphasis, lists, alignment, undo, redo, and font size.',
  },
  {
    target: '[data-editor-tour="template-switcher"]',
    eyebrow: 'Template selection',
    title: 'Compare layouts in place',
    description: 'Use the arrows to move through templates. Your content stays intact while the visual structure changes around it.',
  },
  {
    target: '[data-editor-tour="canvas"]',
    eyebrow: 'Live document canvas',
    title: 'Edit the letter where you see it',
    description: 'Click editable text on the A4 page to make precise changes. Review names, dates, company references, achievements, and the closing before export.',
  },
  {
    target: '[data-editor-tour="export-actions"]',
    eyebrow: 'Final quality check',
    title: 'Preview before you save',
    description: 'Open Print Preview to check page fit, margins, spacing, and text flow. When everything is ready, save the polished letter as a PDF.',
  },
];

const EDGE_SPACE = 16;
const TOOLTIP_WIDTH = 360;
const TOOLTIP_SAFE_HEIGHT = 300;

const getTargetRect = (selector) => {
  const element = document.querySelector(selector);
  if (!element || element.getClientRects().length === 0) return null;
  return element.getBoundingClientRect();
};

const EditorTour = ({ open, onClose, onNavigate }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const [dragPosition, setDragPosition] = useState(null);
  const tooltipRef = useRef(null);
  const dragRef = useRef(null);
  const onNavigateRef = useRef(onNavigate);
  const step = tourSteps[stepIndex];
  const isLastStep = stepIndex === tourSteps.length - 1;

  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);

  useEffect(() => {
    if (!open) {
      setStepIndex(0);
      setDragPosition(null);
    }
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return undefined;

    if (step.tab) onNavigateRef.current?.(step.tab);

    const updatePosition = () => {
      const target = document.querySelector(step.target);
      target?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      setTargetRect(getTargetRect(step.target));
    };
    const timer = window.setTimeout(updatePosition, step.tab ? 360 : 280);
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, step.target]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') setStepIndex((current) => Math.min(current + 1, tourSteps.length - 1));
      if (event.key === 'ArrowLeft') setStepIndex((current) => Math.max(current - 1, 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  const startDragging = (event) => {
    if (event.button !== 0 || !tooltipRef.current) return;
    const rect = tooltipRef.current.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: rect.left,
      originY: rect.top,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const dragTooltip = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !tooltipRef.current) return;
    const width = tooltipRef.current.offsetWidth;
    const height = tooltipRef.current.offsetHeight;
    setDragPosition({
      x: Math.min(Math.max(drag.originX + event.clientX - drag.startX, EDGE_SPACE), window.innerWidth - width - EDGE_SPACE),
      y: Math.min(Math.max(drag.originY + event.clientY - drag.startY, EDGE_SPACE), window.innerHeight - height - EDGE_SPACE),
    });
  };

  const stopDragging = (event) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const compact = viewportWidth < 640;
  const spaceBelow = targetRect ? viewportHeight - targetRect.bottom : 0;
  const placeAbove = targetRect && spaceBelow < TOOLTIP_SAFE_HEIGHT && targetRect.top > TOOLTIP_SAFE_HEIGHT;
  const tooltipLeft = targetRect
    ? Math.min(Math.max(targetRect.left, EDGE_SPACE), viewportWidth - TOOLTIP_WIDTH - EDGE_SPACE)
    : Math.max((viewportWidth - TOOLTIP_WIDTH) / 2, EDGE_SPACE);
  const tooltipTop = targetRect
    ? placeAbove
      ? Math.max(targetRect.top - TOOLTIP_SAFE_HEIGHT - 16, EDGE_SPACE)
      : Math.max(Math.min(targetRect.bottom + 16, viewportHeight - TOOLTIP_SAFE_HEIGHT - EDGE_SPACE), EDGE_SPACE)
    : Math.max((viewportHeight - TOOLTIP_SAFE_HEIGHT) / 2, EDGE_SPACE);
  const defaultTooltipStyle = compact
    ? { left: EDGE_SPACE, right: EDGE_SPACE, bottom: EDGE_SPACE, width: 'auto' }
    : { left: tooltipLeft, top: tooltipTop };
  const tooltipStyle = dragPosition
    ? { left: dragPosition.x, top: dragPosition.y, right: 'auto', bottom: 'auto' }
    : defaultTooltipStyle;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[160]" aria-live="polite">
      {targetRect && !compact ? (
        <div
          className="fixed rounded-[16px] ring-2 ring-[#E3BA5E] ring-offset-4 ring-offset-[#082B45]/50 shadow-[0_0_0_9999px_rgba(2,14,24,0.72)] transition-all duration-300"
          style={{
            left: Math.max(targetRect.left - 4, 4),
            top: Math.max(targetRect.top - 4, 4),
            width: Math.min(targetRect.width + 8, viewportWidth - 8),
            height: Math.min(targetRect.height + 8, viewportHeight - Math.max(targetRect.top - 4, 4) - 4),
          }}
          aria-hidden="true"
        />
      ) : (
        <div className="fixed inset-0 bg-[#020E18]/75" aria-hidden="true" />
      )}

      <section
        ref={tooltipRef}
        className="pointer-events-auto fixed flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[360px] flex-col overflow-hidden rounded-[16px] border border-[#D6C08E] bg-[#FBF7EF] text-[#102D47] shadow-[0_24px_70px_rgba(0,0,0,0.38)]"
        style={tooltipStyle}
        role="dialog"
        aria-modal="false"
        aria-label="Editor tour"
      >
        <div
          className="flex shrink-0 touch-none cursor-grab select-none items-center justify-between border-b border-[#E5DCCA] bg-[#F4EDDF] px-5 py-3 active:cursor-grabbing"
          onPointerDown={startDragging}
          onPointerMove={dragTooltip}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          aria-label="Drag tour window"
        >
          <div className="flex items-center gap-2.5">
            <GripHorizontal size={15} className="text-[#8A7652]" aria-hidden="true" />
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#A56F1D]">
              Editor tour · {stepIndex + 1} of {tourSteps.length}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            onPointerDown={(event) => event.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#587184] transition hover:bg-white hover:text-[#102D47]"
            aria-label="Close editor tour"
          >
            <X size={15} />
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto px-5 py-5 [scrollbar-width:thin]">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#B17B22]">{step.eyebrow}</p>
          <h2 className="mt-2 font-serif text-[24px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#102D47]">{step.title}</h2>
          <p className="mt-3 text-[12px] font-medium leading-5 text-[#587184]">{step.description}</p>
          <div className="mt-5 flex gap-1.5" aria-hidden="true">
            {tourSteps.map((item, index) => (
              <span
                key={item.title}
                className={`h-1.5 rounded-full transition-all ${index === stepIndex ? 'w-7 bg-[#D6A13B]' : 'w-1.5 bg-[#C8D4DB]'}`}
              />
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-[#E5DCCA] bg-[#FBF7EF] px-5 py-3">
          <button
            type="button"
            onClick={() => setStepIndex((current) => Math.max(current - 1, 0))}
            disabled={stepIndex === 0}
            className="inline-flex h-10 items-center gap-2 rounded-lg px-2 text-[12px] font-bold text-[#526C7E] transition hover:text-[#102D47] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <button
            type="button"
            onClick={() => (isLastStep ? onClose() : setStepIndex((current) => current + 1))}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#082B45] px-4 text-[12px] font-bold text-[#F8F4EC] transition hover:bg-[#10405F]"
          >
            {isLastStep ? <>Finish <Check size={14} /></> : <>Next <ArrowRight size={14} /></>}
          </button>
        </div>
      </section>
    </div>,
    document.body
  );
};

export default EditorTour;
