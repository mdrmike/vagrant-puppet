# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.provider :linode do |provider, override|
    override.ssh.private_key_path = '~/.ssh/id_rsa.1'
    override.vm.box = 'linode'
    override.vm.box_url = "https://github.com/displague/vagrant-linode/raw/master/box/linode.box"

    provider.token = 'UsJDu69nTIHaRn70MIBNrdVAvdzVUPjdvsWTgdyPVSCZw1rWw9d8vGyCfBzxZFse'
    provider.distribution = 'Ubuntu 14.04 LTS'
    provider.datacenter = 'fremont'
    provider.plan = 'Linode 1024'
    config.ssh.username = 'smile'
    provider.setup = true
    # provider.planid = <int>
    # provider.paymentterm = <*1*,12,24>
    # provider.datacenterid = 3
    # provider.image = <string>
    # provider.imageid = <int>
    # provider.private_networking = <boolean>
    # provider.stackscript = <string>
    # provider.stackscriptid = <int>
    # provider.distributionid = <int>
    
  end

  # setup puppet on VM
  config.vm.provision "shell", path: "manifests/puppet-install.sh"

  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = 'puppet/manifests'
    puppet.module_path = 'puppet/modules'
    puppet.manifest_file = 'init.pp'
  end
end

