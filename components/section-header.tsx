import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  heading: string
  sub?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  heading,
  sub,
  className,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'space-y-3',
        align === 'center' && 'text-center',
        className
      )}
    >
      <h2 className="section-heading text-gradient leading-none">{heading}</h2>
      {sub && (
        <p className="text-base text-neutral-500 max-w-md">
          {sub}
        </p>
      )}
    </div>
  )
}
