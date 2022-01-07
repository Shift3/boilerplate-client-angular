provider "aws" {
  profile = var.aws_profile
  region  = var.aws_region

  assume_role {
    role_arn = var.aws_assume_role_arn
  }
}

terraform {
  backend "s3" {
    bucket  = "shift3-terraform-state"
    key     = "<project-name>/<environment>/terraform.tfstate"
    region  = "us-west-2"
    profile = "shift3"
  }
}

locals {
  workspace_name = "${terraform.workspace}"
}

module "cloudfront" {
  source                        = "git@github.com:Shift3/terraform-modules.git//modules/aws/cloudfront"
  assume_role_arn               = var.aws_assume_role_arn
  web_domain_name               = var.web_domain_name
  profile                       = var.aws_profile
  secure_response_headers_id    = var.secure_response_headers_id
  route53_zone                  = var.route53_zone
}