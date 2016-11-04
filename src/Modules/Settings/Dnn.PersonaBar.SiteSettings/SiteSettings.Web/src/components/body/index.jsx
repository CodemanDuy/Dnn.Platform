import React, { Component, PropTypes } from "react";
import Tabs from "dnn-tabs";
import { connect } from "react-redux";
import {
    pagination as PaginationActions
} from "../../actions";
import BasicSettings from "../basicSettings";
import DefaultPagesSettings from "../defaultPagesSettings";
import MessagingSettings from "../messagingSettings";
import ProfileSettings from "../profileSettings";
import SiteAliasSettings from "../siteAliasSettings";
import BasicSearchSettings from "../basicSearchSettings";
import LanguageSettings from "../languageSettings";
import SynonymsGroups from "../synonymsGroups";
import IgnoreWords from "../ignoreWords";
import Tooltip from "dnn-tooltip";
import SocialPanelBody from "dnn-social-panel-body";
import MoreSettings from "../moreSettings";
import "./style.less";
import util from "../../utils";
import resx from "../../resources";

let isHost = false;

export class Body extends Component {
    constructor() {
        super();
        this.handleSelect = this.handleSelect.bind(this);
        isHost = util.settings.isHost;
    }

    handleSelect(index) {
        const {props} = this;
        props.dispatch(PaginationActions.loadTab(index));   //index acts as scopeTypeId
    }

    renderSiteBehaviorTab() {
        const {props} = this;
        if (isHost) {
            return <Tabs onSelect={this.handleSelect.bind(this)}
                tabHeaders={[resx.get("TabDefaultPages"),
                resx.get("TabMessaging"),
                resx.get("TabUserProfiles"),
                resx.get("TabSiteAliases"),
                resx.get("TabMore")]}
                type="secondary">
                <DefaultPagesSettings portalId={props.portalId} />
                <MessagingSettings portalId={props.portalId} />
                <ProfileSettings portalId={props.portalId} />
                <SiteAliasSettings portalId={props.portalId} />
                <MoreSettings portalId={props.portalId} openHtmlEditorManager={props.openHtmlEditorManager.bind(this)} />
            </Tabs>;
        }
        else {
            return <Tabs onSelect={this.handleSelect.bind(this)}
                tabHeaders={[resx.get("TabDefaultPages"),
                resx.get("TabMessaging"),
                resx.get("TabUserProfiles")]}
                type="secondary">
                <DefaultPagesSettings portalId={props.portalId} />
                <MessagingSettings portalId={props.portalId} />
                <ProfileSettings portalId={props.portalId} />
            </Tabs>;
        }
    }

    /*eslint no-mixed-spaces-and-tabs: "error"*/
    render() {
        return (
            <SocialPanelBody>
                <Tabs onSelect={this.handleSelect.bind(this)}
                    tabHeaders={[resx.get("TabSiteInfo"),
                    resx.get("TabSiteBehavior"),
                    resx.get("TabLanguage"),
                    resx.get("TabSearch")]}
                    type="primary">
                    <BasicSettings portalId={this.props.portalId} />
                    {this.renderSiteBehaviorTab()}
                    <LanguageSettings portalId={this.props.portalId} />
                    <Tabs onSelect={this.handleSelect.bind(this)}
                        tabHeaders={[resx.get("TabBasicSettings"),
                        resx.get("TabSynonyms"),
                        resx.get("TabIgnoreWords")]}
                        type="secondary">
                        <BasicSearchSettings portalId={this.props.portalId} />
                        <SynonymsGroups portalId={this.props.portalId} />
                        <IgnoreWords portalId={this.props.portalId} />
                    </Tabs>
                </Tabs>
            </SocialPanelBody>
        );
    }
}

Body.propTypes = {
    dispatch: PropTypes.func.isRequired,
    tabIndex: PropTypes.number,
    portalId: PropTypes.number,
    openHtmlEditorManager: PropTypes.func
};

function mapStateToProps(state) {
    return {
        tabIndex: state.pagination.index
    };
}

export default connect(mapStateToProps)(Body);