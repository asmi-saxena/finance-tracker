import {
    Utensils,
    Car,
    Home,
    Film,
    ShoppingBag,
    Bolt,
    HeartPulse,
    Book,
    ShowerHeadIcon as Shower,
    Plane,
    Gift,
    Ellipsis,
    Wallet,
    Briefcase,
    TrendingUp,
    PlusCircle,
    Circle,
    type LucideIcon,
    type LightbulbIcon as LucideProps,
  } from "lucide-react"
  
  interface CategoryIconProps extends LucideProps {
    name: string
  }
  
  const iconMap: Record<string, LucideIcon> = {
    utensils: Utensils,
    car: Car,
    home: Home,
    film: Film,
    "shopping-bag": ShoppingBag,
    bolt: Bolt,
    "heart-pulse": HeartPulse,
    book: Book,
    shower: Shower,
    plane: Plane,
    gift: Gift,
    ellipsis: Ellipsis,
    wallet: Wallet,
    briefcase: Briefcase,
    "trending-up": TrendingUp,
    "plus-circle": PlusCircle,
    circle: Circle,
  }
  
  export function CategoryIcon({ name, ...props }: CategoryIconProps) {
    const Icon = iconMap[name] || Circle
  
    return <Icon {...props} />
  }
  