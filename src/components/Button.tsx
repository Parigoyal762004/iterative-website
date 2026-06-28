import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-sans font-semibold uppercase tracking-[0.07em]',
    'text-[0.6875rem] leading-none',
    'border transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'rounded-none', // sharp corners — 2px via tailwind config default
    'whitespace-nowrap select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        // Mustard fill → Charcoal fill on hover
        primary:
          'bg-accent text-accent-foreground border-accent hover:bg-foreground hover:text-white hover:border-foreground',
        // Mustard outline → Mustard fill on hover
        ghost:
          'bg-transparent text-accent border-accent hover:bg-accent hover:text-accent-foreground',
        // White outline → White fill on hover (for dark surfaces)
        'ghost-light':
          'bg-transparent text-white border-white/60 hover:bg-white hover:text-foreground',
        // Charcoal fill → Teal fill on hover
        dark:
          'bg-foreground text-white border-foreground hover:bg-primary hover:border-primary',
        // Text-only with underline slide
        link: 'border-transparent bg-transparent text-foreground p-0 h-auto tracking-normal text-sm font-medium normal-case hover:text-primary',
        // Teal fill (for primary actions on light backgrounds)
        teal:
          'bg-primary text-primary-foreground border-primary hover:bg-foreground hover:border-foreground',
      },
      size: {
        sm: 'h-8 px-4 text-[0.625rem]',
        md: 'h-10 px-6',
        lg: 'h-12 px-8 text-[0.75rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
