**************
Virtualization
**************

pfSense® software supports a variety of Type-1 (bare metal/native) and
Type-2 (hosted) virtualiztion environments, such as VMware (vSphere,
Fusion or Workstation), Proxmox, VirtualBox, Xen, KVM, Hyper-V and so on.

.. warning:: We recommend using Type-1 hypervisors for production use. Type-2
   hypervisors such as VirtualBox or VMware Workstation work fine for testing,
   but avoid using them for production roles where possible.

Set up and install is straightforward and similar to set up on a physical
machine using a full installation from an ISO image.

.. toctree::
   :maxdepth: 1

   vmware-appliance
   installing-vmware-guest-tools
   virtio-driver-support

Guides
''''''

.. toctree::
   :maxdepth: 1

   virtualizing-pfsense-with-vmware-vsphere-esxi
   virtualizing-pfsense-with-hyper-v
   virtualizing-pfsense-with-proxmox
