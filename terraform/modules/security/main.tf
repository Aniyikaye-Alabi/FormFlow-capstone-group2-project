#####################################################
# Security Group for Application Load Balancer
#####################################################

resource "aws_security_group" "alb_sg" {
  name        = "${var.project_name}-alb-sg"
  description = "Security Group for Application Load Balancer"
  vpc_id      = var.vpc_id

  ingress {
    description = "Allow HTTP from Internet"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTPS from Internet"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow outbound traffic to EC2"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.project_name}-alb-sg"
    }
  )
}

#####################################################
# Security Group for EC2 Instance
#####################################################

resource "aws_security_group" "ec2_sg" {
  name        = "${var.project_name}-ec2-sg"
  description = "Security Group for Application EC2"
  vpc_id      = var.vpc_id

  ###################################################
  # Frontend (Nginx)
  ###################################################
  ingress {
    description     = "Allow HTTP from ALB"
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  ###################################################
  # Backend API
  ###################################################
  ingress {
    description     = "Allow Backend API from ALB"
    from_port       = 3500
    to_port         = 3500
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  ###################################################
  # Outbound
  ###################################################
  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.project_name}-ec2-sg"
    }
  )
}