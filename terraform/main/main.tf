module "cloudfront" {
  source             = "../cloudfront"
  assume_role_arn    = var.assume_role_arn
  web_domain_name    = var.web_domain_name
}