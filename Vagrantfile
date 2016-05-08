# The cool guys from Vagrant did not handle mounting automatically so
# we have to detect OS by ourselves and act appropriately...
# Look in here for extra detection logic: http://goo.gl/tsCgNK
module OS
    def OS.windows?
        (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
    end
end

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.network :forwarded_port, guest: 80, host: 9110
    config.vm.provision :shell, path: "build/bootstrap.sh"

    # fix shared folders on windows
    if OS.windows?
        config.vm.synced_folder ".", "/vagrant", type: "smb"
    end

    # warning - use 2048 memory when fresh installing
    config.vm.provider "virtualbox" do |vb|
        vb.memory = "512"
    end
end
