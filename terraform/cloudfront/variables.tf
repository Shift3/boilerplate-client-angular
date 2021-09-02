variable "assume_role_arn" {
  description = "Assume Role ARN"
}

variable "profile" {
  description = "Name of your profile inside ~/.aws/credentials"
  default     = "shift3"
}

variable "region" {
  default     = "us-east-1"
  description = "Defines where your app should be deployed"
}

variable "web_domain_name" {
  description = "Domain name for the s3 bucket"
}
