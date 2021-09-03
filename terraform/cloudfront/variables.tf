variable "assume_role_arn" {
  description = "Assume Role ARN"
}

variable "profile" {
  description = "Name of your profile inside ~/.aws/credentials"
  default     = "shift3"
}

variable "web_domain_name" {
  description = "Domain name for the s3 bucket"
}
