variable "az" {  
  description = "Availability Zone"  
  type        = string  
  default     = "us-east-1a"  
}

variable "key_pair_name" {
  description = "Key Pair Name"
  type        = string
  default     = "teste"  
}

variable "ami" {
  description = "AMI ID"
  type        = string
  default     = "ami-005fc0f236362e99f"  
}

variable "inst_type" {
  description = "Instance Type"
  type        = string
  default     = "t2.medium"  
}

variable "subnet_id" {
  description = "Subnet ID"
  type        = string
  default     = "subnet-0e87e9781edf35980" 
}

variable "sg_id" {
  description = "Security Group ID"
  type        = string
  default     = "sg-01a495c5d1da3c727" 
}