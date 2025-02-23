import React from 'react'
import t from '~t'
import config from '~config'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '~data/actions/user'
import { user } from '~data/selectors/user'
import { target, environment } from '~target'

import Popover, { Menu, MenuItem, MenuSeparator } from '~co/overlay/popover'
import Icon from '~co/common/icon'

function UserProfileMenu({
    pin,
    onClose,

    logout
}) {
    const location = useLocation()

    return (
        <Popover pin={pin} onClose={onClose}>
            <Menu>

                <MenuItem href={config.links.help.index} target='_blank'>
                    <Icon name='help' />
                    {t.s('help')} {t.s('und')} {t.s('support').toLowerCase()}
                </MenuItem>

                <MenuItem href={config.links.help.changelog} target='_blank'>
                    <Icon name='history' />
                    {t.s('whatsNew')}?
                </MenuItem>

                <MenuItem href={config.links.better} target='_blank'>
                    <Icon name='like' />
                    {t.s('pro_nextFeatures')}
                </MenuItem>

                <MenuSeparator />

                <MenuItem onClick={logout}>
                    <Icon name='exit' />
                    {t.s('logOut')}
                </MenuItem>
            </Menu>
        </Popover>
    )
}

export default connect(
	(state)=>({
        user: user(state)
	}),
	{ logout }
)(UserProfileMenu)