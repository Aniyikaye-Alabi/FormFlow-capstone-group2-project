output "alb_dns_name" {
  description = "ALB DNS Name"
  value       = aws_lb.this.dns_name
}

output "frontend_target_group_arn" {
  description = "Frontend Target Group ARN"
  value       = aws_lb_target_group.frontend.arn
}

output "backend_target_group_arn" {
  description = "Backend Target Group ARN"
  value       = aws_lb_target_group.backend.arn
}