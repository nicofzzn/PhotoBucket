import React, { useContext } from 'react'
import { Nav, Navbar, Container, Image, Dropdown } from 'react-bootstrap'
import { MdFingerprint } from 'react-icons/md'
import { UserContext } from './App'

const Header = () => {
  const [user] = useContext(UserContext)

  return (
    <Navbar bg='light' expand='sm' className='shadow-sm'>
      <Container>
        <Navbar.Brand href='/'>
          <MdFingerprint size='1.5em' /> PhotoBucket
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {user.id && (
              <>
                <Nav.Link href='#link'>Upload</Nav.Link>
                <Dropdown title={user.name} id='basic-nav-dropdown'>
                  <Dropdown.Toggle
                    variant='custom'
                    style={{
                      backgroundColor: 'inherit',
                      border: '0px',
                      padding: '0 0',
                    }}
                  >
                    {user.photo ? (
                      <Image
                        className='dropdown-toggle'
                        style={{
                          width: '40px',
                          height: '40px',
                          marginLeft: '.5rem',
                        }}
                        src={user.photo}
                        roundedCircle
                      />
                    ) : (
                      <Nav.Link href=''>{user.name}</Nav.Link>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='mt-1'>
                    <a
                      style={{ padding: '0 8px' }}
                      className='nav-link'
                      href='/auth/logout'
                    >
                      Logout
                    </a>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
