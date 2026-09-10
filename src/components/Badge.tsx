interface BadgeProps {
  label: string;
}

export default function Badge({ label }: BadgeProps) {
  return <span className="project-tag">{label.toUpperCase()}</span>;
}
