variable "profile" {
  description = "Name of your profile inside ~/.aws/credentials"
  default     = "default"
}

variable "application_name" {
  description = "Name of your application"
}

variable "application_description" {
  description = "Sample application based on Elastic Beanstalk & Docker"
}

variable "iam_s3_bucket_user" {
  description = "Full iam user name i.e. 000000000:user/IAMUserName"
}

variable "region" {
  default     = "us-west-2"
  description = "Defines where your app should be deployed"
}

variable "web_domain_name" {
  description = "Domain name for the s3 bucket"
}

variable "zone_id" {
  description = "AWS Route53 hosted zone id"
}

variable "zone_alias_id" {
  description = "AWS Route53 s3 zone_alias id"
}

variable "cnames" {
  type = "list"

  default = []
}
