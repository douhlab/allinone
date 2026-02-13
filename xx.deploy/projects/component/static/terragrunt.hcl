include "root" {
  path   = find_in_parent_folders()
  merge_strategy = "deep"
}

include "env_config" {
  path   = find_in_parent_folders("inputs_env.hcl")
  merge_strategy = "deep"
}

terraform {
  source = "${get_repo_root()}//modules/component/static"
}
