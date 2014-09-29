class nginx {

	# Symlink guest /var/www/app to host /vagrant
	file { '/var/www/app':
	  ensure  => 'link',
	  target  => '/vagrant/app',
	}

	package { 'nginx':
	  ensure => 'present',
	  require => Exec['apt-get update'],
	}

	service { 'nginx':
	  ensure => running,
	  require => Package['nginx'],
	}

	# Add vhost template
	file { 'vagrant-nginx':
	    path => '/etc/nginx/sites-available/TEMPLATE.conf',
	    ensure => file,
	    require => Package['nginx'],
	    source => 'puppet:///modules/nginx/TEMPLATE.conf',
	}

	# Disable default nginx vhost
	file { 'default-nginx-disable':
	    path => '/etc/nginx/sites-enabled/default',
	    ensure => absent,
	    require => Package['nginx'],
	}

	# Symlink our vhost in sites-enabled
	file { 'vagrant-nginx-enable':
	    path => '/etc/nginx/sites-enabled/TEMPLATE.conf',
	    target => '/etc/nginx/sites-available/TEMPLATE.conf',
	    ensure => link,
	    notify => Service['nginx'],
	    require => [
	        File['vagrant-nginx'],
	        File['default-nginx-disable'],
	    ],
	}
}
