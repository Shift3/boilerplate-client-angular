variable "aws_assume_role_arn" {
  default     = "arn:aws:iam::008036621198:role/SuperDevAssumeRole"
  description = "Assume Role ARN"
}

variable "aws_profile" {
  description = "Name of your profile inside ~/.aws/credentials"
  default     = "shift3"
}

variable "aws_region" {
  description = "Defines where your app should be deployed"
  default     = "us-west-2"
}

variable "web_domain_name" {
  description = "Domain name for the s3 bucket. An example example-staging.shift3sandbox.com"
}

variable "secure_response_headers_id"{
  description = "Default security header policy ID (shift3 account)"
  default = "b52c8245-8965-4882-a446-8773a50b46ab"
}

variable "route53_zone" { 

  description = "Zone for Route53"
  default = "shift3sandbox.com."
}