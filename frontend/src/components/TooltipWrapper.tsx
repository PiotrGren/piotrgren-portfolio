// src/components/TooltipWrapper.tsx
import * as Tooltip from '@radix-ui/react-tooltip'

type Props = {
  label: string
  children: React.ReactNode
}

export default function TooltipWrapper({ label, children }: Props) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            align="center"
            className="px-2 py-1 rounded bg-black text-white text-xs shadow-lg z-50"
            sideOffset={5}
          >
            {label}
            <Tooltip.Arrow className="fill-black" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
