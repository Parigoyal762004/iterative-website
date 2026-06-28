/**
 * Compatibility shim — maps V1 MagneticButton API to V2 Button.
 * Preserved pages (Contact, Calculator, LoanAudit, NotFound) use this without modification.
 */
import { Button, buttonVariants } from '@/components/Button'
import { cn } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'

type V1Variant = 'teal' | 'ghost-light' | 'ghost-teal' | 'dark'

const variantMap: Record<V1Variant, VariantProps<typeof buttonVariants>['variant']> = {
  'teal':        'primary',
  'ghost-light': 'ghost-light',
  'ghost-teal':  'ghost',
  'dark':        'dark',
}

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: V1Variant
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

const MagneticButton = ({
  variant = 'teal',
  size = 'md',
  className,
  children,
  ...props
}: MagneticButtonProps) => (
  <Button
    variant={variantMap[variant] ?? 'primary'}
    size={size}
    className={cn(className)}
    {...props}
  >
    {children}
  </Button>
)

export default MagneticButton
