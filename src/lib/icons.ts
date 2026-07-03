import {
  PenLine,
  Image as ImageIcon,
  Video,
  Code2,
  Palette,
  Zap,
  Megaphone,
  Music,
  Search,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  PenLine,
  ImageIcon,
  Video,
  Code2,
  Palette,
  Zap,
  Megaphone,
  Music,
  Search,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Sparkles,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}
