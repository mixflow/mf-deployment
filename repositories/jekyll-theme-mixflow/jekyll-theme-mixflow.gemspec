# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-mixflow"
  spec.version       = "0.1.0"
  spec.authors       = ["MixFlow"]
  spec.email         = ["mixedflown@gmail.com"]

  spec.summary       = "a jekyll theme which is designed for websites with rich images, articles and blog posts."
  spec.homepage      = "https://www.mix-flow.com"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.2"
  spec.add_runtime_dependency "sass-embedded", "~> 1.5"
  # Import `webrick` gem explictly when uses ruby 3.0+, Jeklly require it when build site.
  # TODO jekyll 4.3 add webrick dependency, remove this when upgrade.
  spec.add_runtime_dependency "webrick", "~> 1.7"
end
